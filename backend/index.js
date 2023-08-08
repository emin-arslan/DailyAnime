const express = require("express");
const cors = require("cors");
const Anime = require("./db/CardData");
const app = express();
const AnimeXin = require("./Animexin");
const TurkAnime = require("./TurkAnime");
app.use(cors());
app.use(express.json());

async function setAnimeDatas () {
  await Anime.insertMany({
    title:"start of function",
    imageUrl:"bilinmez",
    episode:"String",
    source:"String",
    watchLink:"String",
  })
  try {
    console.log("babahere")
    let turkAnimeCards = [];
    const resultCardArray = [];
    try {
      turkAnimeCards = await TurkAnime();
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
    const chineseAnimeCards = await AnimeXin();
    for (let index = 0; index < 9; index++) {
      resultCardArray.push(chineseAnimeCards[index]);
      resultCardArray.push(turkAnimeCards[index]);
    }
    await Anime.deleteMany({});
    await Anime.insertMany(resultCardArray);
    await Anime.insertMany({
      title:"end of function",
      imageUrl:"bilinmez",
      episode:"String",
      source:"String",
      watchLink:"String",
    })
  } catch (error) {
    await Anime.insertMany({
      title:"hata of function",
      imageUrl:"bilinmez",
      episode:"String",
      source:"String",
      watchLink:"String",
    })
    console.error("setAnimeDatas Hata:", error);
  } finally {
    // setAnimeDatas fonksiyonu tamamlandıktan sonra tekrar çağır
    //setTimeout(setAnimeDatas, 200000); // Her 5 dakikada bir (300000 ms) setAnimeDatas fonksiyonunu çağırır
  }
}

//setAnimeDatas(); // İlk kez başlatmak için setAnimeDatas fonksiyonunu çağır

app.get("/animeCards", async (req, resp) => {
  await setAnimeDatas();
  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(5000);
