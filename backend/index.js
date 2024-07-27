const express = require("express");
const cors = require("cors");
const path = require("path");
const Anime = require("./db/CardData");
const AnimeAdd = require("./db/AnimeInfo");
const AnimeEpisode = require("./db/AnimeEpisode");
const app = express();
const AnimeXin = require("./Animexin");

app.use(cors());
app.use(express.json());

const allowedIPs = []; // Boş IP listesi

// Proxy arkasında çalışırken gerçek IP'yi almak için trust proxy ayarı
app.set('trust proxy', true);

// IP kontrolü yapan middleware
const ipFilter = (req, res, next) => {
  const clientIp = req.ip;

  if (allowedIPs.includes(clientIp)) {
    next(); // İzin verilen IP, işleme devam et
  } else {
    // İzin verilmeyen IP, özel bir resim göster
    res.sendFile(path.join(__dirname, 'access_denied.jpg')); // access_denied.jpg dosyasını proje kök dizinine koyun
  }
};

// Middleware'i en üst düzeyde uygulayın
app.use(ipFilter);

async function setAnimeDatas() {
  try {
    const resultCardArray = [];
    const chineseAnimeCards = await AnimeXin();
    for (let index = 0; index < 18; index++) {
      if (chineseAnimeCards[index].title != null && chineseAnimeCards[index].title != "") resultCardArray.push(chineseAnimeCards[index]);
    }
    await Anime.deleteMany({});
    await Anime.insertMany(resultCardArray);
  } catch (error) {
    console.error("setAnimeDatas Hata:", error);
  } finally {
    // setAnimeDatas fonksiyonu tamamlandıktan sonra tekrar çağır
    //setTimeout(setAnimeDatas, 2000000); // Her 5 dakikada bir (300000 ms) setAnimeDatas fonksiyonunu çağırır
  }
}

//setAnimeDatas(); // İlk kez başlatmak için setAnimeDatas fonksiyonunu çağır

// GET endpoint: /animeCards
app.get("/animeCards", async (req, resp) => {
  try {
    const animeCards = await Anime.find({});
    resp.status(200).json({ body: animeCards });
  } catch (error) {
    resp.status(500).json({ error: 'Veriler alınırken hata oluştu' });
  }
});

// POST endpoint: /addAnime
app.post("/addAnime", async (req, resp) => {
  try {
    console.log(req.body);
    const newAnime = req.body; // Gelen veri
    console.log(newAnime.NAME, newAnime.DESCRIPTION, newAnime.TOTAL_EPISODES);
    if (!newAnime.NAME || !newAnime.DESCRIPTION || !newAnime.TOTAL_EPISODES) {
      return resp.status(400).json({ error: 'Gerekli alanlar eksik' });
    }

    // Yeni anime verisini MongoDB'ye ekle
    const addedAnime = await AnimeAdd.create(newAnime);
    resp.status(201).json({ message: 'Anime başarıyla eklendi', data: addedAnime });
  } catch (error) {
    console.error("addAnime Hata:", error);
    resp.status(500).json({ error: 'Anime eklenirken hata oluştu' });
  }
});

app.get("/animeInfos", async (req, resp) => {
  console.log('sa');
  try {
    // Fetch specified fields, '_id' is included by default unless explicitly excluded
    const animeNames = await AnimeAdd.find({});
    resp.status(200).json({ body: animeNames });
  } catch (error) {
    resp.status(500).json({ error: 'Animelerin isimleri alınırken hata oluştu' });
  }
});

// Yeni POST endpoint: /addEpisode
app.post("/addEpisode", async (req, resp) => {
  try {
    const newEpisode = req.body; // Gelen veri
    if (!newEpisode.ANIME_ID || !newEpisode.EPISODE_NUMBER) {
      return resp.status(400).json({ error: 'Gerekli alanlar eksik' });
    }

    // Yeni bölüm verisini MongoDB'ye ekle
    const addedEpisode = await AnimeEpisode.create(newEpisode);
    resp.status(201).json({ message: 'Bölüm başarıyla eklendi', data: addedEpisode });
  } catch (error) {
    console.error("addEpisode Hata:", error);
    resp.status(500).json({ error: 'Bölüm eklenirken hata oluştu' });
  }
});

// Yeni GET endpoint: /episodesbycount
app.get("/episodesbycount", async (req, resp) => {
  try {
    const { id } = req.query; // Extract 'id' from query parameters
    const query = {};
    if (id) {
      query._id = id; // If 'id' is provided, set it in the query object
    }

    const episodes = await AnimeEpisode.find(query); // Fetch episodes based on the query
    resp.status(200).json({ body: episodes });
  } catch (error) {
    resp.status(500).json({ error: 'Bölümler alınırken hata oluştu' });
  }
});

// Yeni GET endpoint: /episodes
app.get("/episodes", async (req, resp) => {
  try {
    const { id, count } = req.query; // Extract 'id' and 'count' from query parameters

    let episodes = [];
    
    if (id) {
      // If 'id' is provided, find episodes with matching ANIME_ID
      episodes = await AnimeEpisode.find({ ANIME_ID: id });
    } else if (count) {
      // If 'count' is provided, find the first 'count' episodes while skipping those with the same ANIME_ID
      episodes = await AnimeEpisode.aggregate([
        { $group: { _id: "$ANIME_ID", episodes: { $push: "$$ROOT" } } },
        { $unwind: "$episodes" },
        { $replaceRoot: { newRoot: "$episodes" } },
        { $limit: parseInt(count) }
      ]);
    }

    resp.status(200).json({ body: episodes });
  } catch (error) {
    resp.status(500).json({ error: 'Bölümler alınırken hata oluştu' });
  }
});

// Index sayfasına erişimi engelleyen endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'access_denied.jpg')); // access_denied.jpg dosyasını proje kök dizinine koyun
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
