const express = require("express");
const cors = require("cors");
const Anime = require("./db/CardData");
const app = express();
const AnimeXin = require("./Animexin");
const TurkAnime = require("./TurkAnime");
app.use(cors());
app.use(express.json());

async function setAnimeDatas () {
  console.log("babahere")
  let turkAnimeCards = [];
  const resultCardArray = [];
  const chineseAnimeCards = await AnimeXin();
  try {
    turkAnimeCards = await TurkAnime();
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
  for (let index = 0; index < 9; index++) {
    resultCardArray.push(chineseAnimeCards[index]);
    resultCardArray.push(turkAnimeCards[index]);
  }
  await Anime.deleteMany({});
  await Anime.insertMany(resultCardArray);
}

setInterval(setAnimeDatas,300000)

app.get("/animeCards", async (req, resp) => {
  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(5000);
