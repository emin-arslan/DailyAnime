const express = require("express");
const cors = require("cors");
const TrAnime = require("./TrAnime");
const ChineseAnime = require("./ChineseAnime");
const Anime = require("./db/CardData");

const app = express();
app.use(cors());
app.use(express.json());
/* 
console.log("buraya girdi.")
  let trAnimeCards = []
  try {
    const animeData = await TrAnime();
    trAnimeCards = [...animeData]
  } catch (error) {
    console.error("Hata:", error);
  }
  console.log(trAnimeCards)
  console.log("#".repeat(100))
  const chineseAnimeCards = await ChineseAnime()
  console.log( chineseAnimeCards );
  const resultArray = [];
  for (let index = 0; index < 9; index++) {
    resultArray.push(chineseAnimeCards[index]);
    resultArray.push(trAnimeCards[index])
  }
  await Anime.deleteMany({});
  await Anime.insertMany(resultArray);

*/
app.get("/anime-cards", async (req, resp) => {
  console.log("buraya girdi.")
  let trAnimeCards = []
  try {
    const animeData = await TrAnime();
    trAnimeCards = [...animeData]
  } catch (error) {
    console.error("Hata:", error);
  }
  console.log(trAnimeCards)
  console.log("#".repeat(100))
  const chineseAnimeCards = await ChineseAnime()
  console.log( chineseAnimeCards );
  const resultArray = [];
  for (let index = 0; index < 9; index++) {
    resultArray.push(chineseAnimeCards[index]);
    resultArray.push(trAnimeCards[index])
  }
  await Anime.deleteMany({});
  await Anime.insertMany(resultArray);

  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(5000);
