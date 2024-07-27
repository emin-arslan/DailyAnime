const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Anime Episode Şeması Tanımı
const animeEpisodeSchema = new Schema({
  ANIME_ID: {
    type: Schema.Types.ObjectId, // İlgili anime'nin ID'si
    required: true,
    ref: 'AnimeInfo' // AnimeInfo koleksiyonuna referans
  },
  WATCH_LINK_1: {
    type: String,
    required: false
  },
  WATCH_LINK_2: {
    type: String,
    required: false
  },
  WATCH_LINK_3: {
    type: String,
    required: false
  },
  EPISODE_NUMBER: {
    type: Number,
    required: true
  }
});

// Model Oluşturma
const AnimeEpisode = mongoose.model('AnimeEpisode', animeEpisodeSchema);

module.exports = AnimeEpisode;
