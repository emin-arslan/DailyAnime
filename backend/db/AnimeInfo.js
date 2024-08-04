const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Anime Şeması Tanımı
const animeInfoSchema = new Schema({
  NAME: {
    type: String,
    required: false
  },
  DESCRIPTION: {
    type: String,
    required: false
  },
  TOTAL_EPISODES: {
    type: Number,
    required: false
  },
  FIRST_IMAGE: {
    type: String,
    required: false
  },
  SECOND_IMAGE: {
    type: String,
    required: false
  },
  CATEGORIES: {
    type: [String],
    required: false
  }
});

// Model Oluşturma
const AnimeInfo = mongoose.model('AnimeInfo', animeInfoSchema);

module.exports = AnimeInfo;
