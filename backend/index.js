const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AnimeInfo = require("./db/AnimeInfo");
const AnimeEpisode = require("./db/AnimeEpisode");
require("./db/config")
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// IP kontrolü
const allowedIPs = ["88.230.139.177","188.132.133.94"];

app.set('trust proxy', true);

const ipFilter = (req, res, next) => {
  // x-forwarded-for başlığını kontrol et
  const forwardedFor = req.headers['x-forwarded-for'];
  let clientIp = forwardedFor ? forwardedFor.split(',').shift().trim() : req.connection.remoteAddress;

  // Eğer IP yerel IP ise (localhost), bunu kontrol et
  if (clientIp === '::1' || clientIp === '127.0.0.1') {
    clientIp = 'localhost';
  }

  // IP'yi logla
  console.log("Client IP:", clientIp);

  // IP kontrolü
  if (allowedIPs.includes(clientIp) || clientIp === 'localhost') {
    next();
  } else {
    res.status(403).json({ message: 'Erişim engellendi' }); // 403 hata kodu
  }
};


// Endpoint oluşturma
app.get('/getHomePageAnimes/:count', async (req, res) => {
  const count = parseInt(req.params.count, 10);

  try {
    // Son eklenen ve farklı ANIME_ID'lere sahip bölümleri al
    const recentEpisodes = await AnimeEpisode.aggregate([
      { $sort: { _id: -1 } },
      {
        $group: {
          _id: "$ANIME_ID",
          episode: { $first: "$$ROOT" }
        }
      },
      { $limit: count }
    ]);

    // Alınan bölümlerden ANIME_ID'leri çıkar
    const animeIds = recentEpisodes.map(group => group._id);

    // Bu ANIME_ID'lere sahip anime bilgilerini al
    const animeInfos = await AnimeInfo.find({ _id: { $in: animeIds } });

    // Bu ANIME_ID'lere sahip tüm bölümleri al
    const allEpisodes = await AnimeEpisode.find({ ANIME_ID: { $in: animeIds } });

    // Bölümleri anime bilgileriyle eşleştir
    const result = animeInfos.map(anime => {
      // Bu animeye ait tüm bölümleri al
      const episodes = allEpisodes.filter(episode => episode.ANIME_ID.toString() === anime._id.toString());

      return {
        id: anime._id,
        name: anime.NAME,
        description: anime.DESCRIPTION,
        first_image: anime.FIRST_IMAGE,
        second_image: anime.SECOND_IMAGE,
        categories: anime.CATEGORIES,
        total_episodes: anime.TOTAL_EPISODES,
        relatedAnimes: anime.RELATED_ANIMES,
        seasonNumber: anime.SEASON_NUMBER,
        episodes: episodes.reverse().map(ep => ({
          episode_number: ep.EPISODE_NUMBER,
          watch_link_1: ep.WATCH_LINK_1,
          watch_link_2: ep.WATCH_LINK_2,
          watch_link_3: ep.WATCH_LINK_3,
          type: ep.TYPE
        }))
      };
    });

    // Son eklenen bölümler sırasına göre döndür
    res.json(result.sort((a, b) => {
      const aDate = recentEpisodes.find(ep => ep._id.toString() === a.id.toString()).episode._id.getTimestamp();
      const bDate = recentEpisodes.find(ep => ep._id.toString() === b.id.toString()).episode._id.getTimestamp();
      return bDate - aDate;
    }));
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});


app.get('/animes', async (req, res) => {
  
  try {
    // Tüm anime bilgilerini çek
    const animes = await AnimeInfo.find().exec();

    // Anime'ye ait en son bölümü bul ve anime bilgilerine ekle
    const animesWithLastEpisode = await Promise.all(animes.map(async (anime) => {
      // Anime'ye ait en yüksek bölüm numarasını bul
      const lastEpisode = await AnimeEpisode.findOne({ ANIME_ID: anime._id })
        .sort({ EPISODE_NUMBER: -1 })
        .exec();
      // Anime bilgilerine en son yayınlanan bölüm numarasını ekle
      return {
        ...anime.toObject(),
        LAST_PUBLISHED_EPISODE: lastEpisode ? lastEpisode.EPISODE_NUMBER : 0
      };
    }));
    res.json(animesWithLastEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sadece izin verilen IP'den gelen istekler için IP filtresi uygulandı
app.post('/addNewAnime', ipFilter, async (req, res) => {
  const { NAME, DESCRIPTION, TOTAL_EPISODES, FIRST_IMAGE, SECOND_IMAGE, CATEGORIES,RELATED_ANIMES ,SEASON_NUMBER } = req.body;
  try {
    // Aynı isimde anime olup olmadığını kontrol et
    const existingAnime = await AnimeInfo.findOne({ NAME });
    if (existingAnime) {
      return res.status(400).json({ message: 'Anime with the same name already exists' });
    }

    const newAnime = new AnimeInfo({
      NAME:NAME.trim(),
      DESCRIPTION,
      TOTAL_EPISODES,
      FIRST_IMAGE,
      SECOND_IMAGE,
      CATEGORIES,
      RELATED_ANIMES,
      SEASON_NUMBER
    });

    const savedAnime = await newAnime.save();
    res.status(201).json(savedAnime);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Sadece izin verilen IP'den gelen istekler için IP filtresi uygulandı
app.post('/addNewEpisode', ipFilter, async (req, res) => {
  const { animeId, watchLink1, watchLink2, watchLink3, episodeNumber, type } = req.body.payload;

  try {
    // Anime'nin var olup olmadığını kontrol et
    const animeExists = await AnimeInfo.findById(animeId);
    if (!animeExists) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    // Aynı bölüm numarasına sahip bir bölüm olup olmadığını kontrol et
    const existingEpisode = await AnimeEpisode.findOne({ ANIME_ID: animeId, EPISODE_NUMBER: episodeNumber });
    if (existingEpisode) {
      return res.status(400).json({ message: 'Episode number already exists for this anime' });
    }

    // Yeni bölümü ekle
    const newEpisode = new AnimeEpisode({
      ANIME_ID: animeId,
      WATCH_LINK_1: watchLink1,
      WATCH_LINK_2: watchLink2,
      WATCH_LINK_3: watchLink3,
      EPISODE_NUMBER: episodeNumber,
      TYPE: type,
    });

    await newEpisode.save();
    res.status(201).json(newEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Sadece izin verilen IP'den gelen istekler için IP filtresi uygulandı
app.put('/updateEpisode', ipFilter, async (req, res) => {
  const { animeId, watchLink1, watchLink2, watchLink3, episodeNumber, type } = req.body.payload;

  try {
    // Find the episode by animeId and episodeNumber
    const episode = await AnimeEpisode.findOne({
      ANIME_ID: animeId,
      EPISODE_NUMBER: episodeNumber
    });

    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    // Update the fields if the values are provided
    if (watchLink1) episode.WATCH_LINK_1 = watchLink1;
    if (watchLink2) episode.WATCH_LINK_2 = watchLink2;
    if (watchLink3) episode.WATCH_LINK_3 = watchLink3;
    if(type) episode.TYPE = type;
    // Save the updated episode
    await episode.save();

    res.status(200).json({ message: 'Episode updated successfully', episode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Sadece izin verilen IP'den gelen istekler için IP filtresi uygulandı
app.put('/updateAnime', ipFilter, async (req, res) => {
  const { id ,name, description, totalEpisodes, smallImage, largeImage, categories, relatedAnimes,seasonNumber } = req.body.payload;
  try {
    const updateFields = {};

    // Gelen değerleri kontrol et ve sadece dolu olanları güncelle
    if (name) updateFields.NAME = name;
    if (description) updateFields.DESCRIPTION = description;
    if (totalEpisodes || totalEpisodes === 0) updateFields.TOTAL_EPISODES = totalEpisodes;
    if (smallImage) updateFields.FIRST_IMAGE = smallImage;
    if (largeImage) updateFields.SECOND_IMAGE = largeImage;
    if (categories.length > 0) updateFields.CATEGORIES = categories;
    if(relatedAnimes.length > 0) updateFields.RELATED_ANIMES = relatedAnimes;
    if(seasonNumber) updateFields.SEASON_NUMBER = seasonNumber;
    console.log(updateFields);
    // Anime bilgilerini güncelle
    const updatedAnime = await AnimeInfo.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

    if (!updatedAnime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    res.status(200).json(updatedAnime);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/searchAnime', async (req, res) => {
  const name = req.body.payload; // Anime ismini body'den al
  if (!name) {
    return res.status(400).json({ error: 'Anime ismi gereklidir' });
  }
  const animeName = name.trim().toLowerCase(); // Anime ismini temizle ve küçük harfe dönüştür

  try {
    // Anime ismiyle anime bilgilerini arama (case-insensitive)
    const anime = await AnimeInfo.findOne({
      NAME: { $regex: new RegExp('^' + animeName + '$', 'i') }
    });

    if (!anime) {
      return res.status(404).json({ error: 'Anime bulunamadı' });
    }

    // Bulunan anime ID'si ile bölümleri arama
    const episodes = await AnimeEpisode.find({ ANIME_ID: anime._id });
    // Anime bilgilerini ve bölümleri döndür
    res.json({
      id: anime._id,
      name: anime.NAME,
      description: anime.DESCRIPTION,
      total_episodes: anime.TOTAL_EPISODES,
      first_image: anime.FIRST_IMAGE,
      second_image: anime.SECOND_IMAGE,
      categories: anime.CATEGORIES,
      related_animes: anime.RELATED_ANIMES,
      seasonNumber: anime.SEASON_NUMBER,
      episodes: episodes.map(ep => ({
        id: ep._id,
        episode_number: ep.EPISODE_NUMBER,
        watch_link_1: ep.WATCH_LINK_1,
        watch_link_2: ep.WATCH_LINK_2,
        watch_link_3: ep.WATCH_LINK_3,
        type:ep.TYPE
      }))
    });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
