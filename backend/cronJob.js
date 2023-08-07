const cron = require("node-cron");
const Anime = require("./db/CardData");
const AnimeXin = require("./Animexin");
const TurkAnime = require("./TurkAnime");
// Cron işlemi, her 4 saatte bir mySaga.js dosyasını tetikleyecek
function cronJob() {

  cron.schedule("*/5 * * * *", async () => {
    console.log("10snde bir çalıştı. CronJob")
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
  });
}
module.exports = cronJob;
