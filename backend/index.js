const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const Anime = require("./db/CardData");
const TrAnime = require("./TrAnime");
const ChineseAnime = require("./ChineseAnime");
const TrAnimeci = require("./TrAnimeci");
const TurkAnime = require("./TurkAnime");
app.use(cors());

app.use(express.json());

app.get("/anime-cards", async (req, resp) => {
  await ChineseAnime();
  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(5000);
