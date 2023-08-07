const express = require("express");
const cors = require("cors");
const Anime = require("./db/CardData");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/animeCards", async (req, resp) => {
  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(5000);
