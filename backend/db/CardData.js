require('./config')
const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
    title: String,
    imageUrl: String,
    videoUrl: String,
    episode:String,
    source:String,
    watchLink:String
})

const animeModal = mongoose.model("cardData", animeSchema)

module.exports = animeModal


/*  title: String,
    imageUrl: String,
    videoUrl: String,
    episode:String,
    subtitle:String, */