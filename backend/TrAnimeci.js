const Anime = require("./db/CardData");
const cheerio = require("cheerio");
const axios = require("axios");

const puppeteer = require("puppeteer")
async function TrAnimeci(url="https://tranimeci.com/") {
 // await Anime.deleteMany({});
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const articles = $("article.bs");
      let index = 0;
      let sayac = 0;
      // Bütün makalelerdeki bilgileri döngü ile al
       while(sayac < 18) {
        const element = articles[index];
        const title = $(element).find("h2[itemprop='headline']").text();
        const episode = $(element).find("span.epx").text();
        const subtitle = $(element).find("span.sb.Sub").text();
        const imageUrl = $(element).find("img").attr("src");
        const link = "https://tranimeci.com"+$(element).find("a").attr("href");
        
        const videoUrl = await getVideoUrl(link);
        const check = await Anime.find({title:title})
        

        const animeCard = {
          title,
          subtitle,
          episode,
          imageUrl,
          videoUrl,
          source:"TrAnimeci",
        }

        // if(check.length < 1 )
        // {
        //   await Anime.insertMany(animeCard)
          
        //   console.log("Başlık:", title);
        //   console.log("Bölüm:", episode);
        //   console.log("Altyazı:", subtitle);
        //   console.log("Resim URL:", imageUrl);
        //   console.log("Link:", videoUrl);
        //   console.log("=".repeat(40));
        // }
        sayac++;
        index++;
        
      }
    } catch (error) {
    }
  }


  async function getVideoUrl() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('https://tranimeci.com/video/shan-hai-ji-hui-17-bolum');
  
      // Beklenen öğeyi seçene kadar sayfanın yüklenmesini bekle (video'nun yüklenmesi için)
      await page.waitForSelector('#fluid_video_wrapper_video-id');
  
      // Beklenen öğeyi seçin (Bu örnekte video etiketini seçiyoruz)
      const videoElement = await page.$('#fluid_video_wrapper_video-id video');
      console.log(videoElement)
      // video etiketinin src özelliğini alın
      const videoUrl = await page.evaluate(element => element.src, videoElement);
  
      // İşlemi tamamlayın ve tarayıcıyı kapatın
      await browser.close();
  
      return videoUrl;
    } catch (error) {
      console.error('Hata oluştu:', error);
      await browser.close();
      return null;
    }
  }
  module.exports = TrAnimeci