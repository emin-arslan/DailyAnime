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
const allowedIPs = ["88.230.139.177"];

app.set('trust proxy', true);

const ipFilter = (req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (allowedIPs.includes(clientIp)) {
    next();
  } else {
    res.status(403).json({ error: 'Erişim engellendi' }); // 403 hata kodu
  }
};

// IP kontrol middleware'ini etkinleştirin
// app.use(ipFilter);

// Endpoint oluşturma
app.get('/getHomePageAnimes/:count', async (req, res) => {
  const count = parseInt(req.params.count, 10);

  try {
    // Son eklenen bölümleri al
    const recentEpisodes = await AnimeEpisode.find().sort({ _id: -1 }).limit(count);

    // Anime ID'leriyle eşleşen anime bilgilerini al
    const animeIds = recentEpisodes.map(episode => episode.ANIME_ID);
    const animeInfos = await AnimeInfo.find({ _id: { $in: animeIds } });

    // Bölümleri anime bilgileriyle eşleştir
    const result = animeInfos.map(anime => {
      const episodes = recentEpisodes.filter(episode => episode.ANIME_ID.toString() === anime._id.toString());

      return {
        id: anime._id,
        name: anime.NAME,
        description: anime.DESCRIPTION,
        first_image: anime.FIRST_IMAGE,
        second_image: anime.SECOND_IMAGE,
        categories: anime.CATEGORIES,
        total_episodes: anime.TOTAL_EPISODES,
        episodes: episodes.map(ep => ({
          episode_number: ep.EPISODE_NUMBER,
          watch_link_1: ep.WATCH_LINK_1,
          watch_link_2: ep.WATCH_LINK_2,
          watch_link_3: ep.WATCH_LINK_3
        }))
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Index sayfasına erişimi engelleyen endpoint
app.get("/", (req, res) => {
  console.log('Erişim engellendi');
  res.status(403).send("Erişim engellendi");
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
