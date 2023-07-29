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
  try {
    console.log("buraya girdi.");
    let trAnimeCards = [];
    console.log(req)
    if(req.query.errorHandler === "1")
    {
      resp.status(200).json({body:"burası 1"})
    }
    
    const animeData = await TrAnime(req.query.errorHandler);
    trAnimeCards = [...animeData];
    if(req.query.errorHandler === "2")
    {
      resp.status(200).json({body:"burası 2"})
    }
    console.log(trAnimeCards);
    console.log("#".repeat(100));
    const chineseAnimeCards = await ChineseAnime();
    console.log(chineseAnimeCards);
    if(req.query.errorHandler === "3")
    {
      resp.status(200).json({body:"burası 3"})
    }
    const resultArray = [];
    for (let index = 0; index < 9; index++) {
      resultArray.push(chineseAnimeCards[index]);
      resultArray.push(trAnimeCards[index]);
    }
    if(req.query.errorHandler === "4")
    {
      resp.status(200).json({body:"burası 4"})
    }
    await Anime.deleteMany({});
    await Anime.insertMany(resultArray);
    if(req.query.errorHandler === "5")
    {
      resp.status(200).json({body:"burası 5"})
    }
    resp.status(200).json({ body: await Anime.find({}) });
  } catch (error) {
    console.error("handle error", "bbbbbbbbbbbbbbbbbbbbbbbb");
    resp.status(200).json({body:error.message});
  }
});

app.get("/", (req, resp) => {
  resp.status(200).json({ status: "OK" });
});

app.get("/animes", async (req, resp) => {
  resp.status(200).json({ body: await Anime.find({}) });
});


app.listen(5000);
