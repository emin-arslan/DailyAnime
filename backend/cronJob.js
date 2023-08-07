const cron = require("node-cron");
const Anime = require("./db/CardData");
const AnimeXin = require("./Animexin");
const TurkAnime = require("./TurkAnime");
// Cron işlemi, her 4 saatte bir mySaga.js dosyasını tetikleyecek
function cronJob() {

  cron.schedule("*/5 * * * *", async () => {
    console.log("10snde bir çalıştı. CronJob")
   
  });
}
module.exports = cronJob;
