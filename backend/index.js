const express = require("express");
const cors = require("cors");
const Anime = require("./db/CardData");
const app = express();
const AnimeXin = require("./Animexin");
app.use(cors());
app.use(express.json());

async function setAnimeDatas () {
  try {
    const resultCardArray = [];
    const chineseAnimeCards = await AnimeXin();
    for (let index = 0; index < 18; index++) {
      if(chineseAnimeCards[index].title != null && chineseAnimeCards[index].title != "") resultCardArray.push(chineseAnimeCards[index]);
    }
    await Anime.deleteMany({});
    await Anime.insertMany(resultCardArray);
  } catch (error) {
    console.error("setAnimeDatas Hata:", error);
  } finally {
    // setAnimeDatas fonksiyonu tamamlandıktan sonra tekrar çağır
    setTimeout(setAnimeDatas, 800000); // Her 5 dakikada bir (300000 ms) setAnimeDatas fonksiyonunu çağırır
  }
}

setAnimeDatas(); // İlk kez başlatmak için setAnimeDatas fonksiyonunu çağır

app.get("/animeCards", async (req, resp) => {
  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(process.env.PORT || 5000);
