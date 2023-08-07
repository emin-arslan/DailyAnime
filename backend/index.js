const express = require("express");
const cors = require("cors");
const cronJob = require("./cronJob");

const app = express();
app.use(cors());
app.use(express.json());
cronJob();

app.get("/animeCards", async (req, resp) => {
  resp.status(200).json({ body: await Anime.find({}) });
});

app.listen(5000);
