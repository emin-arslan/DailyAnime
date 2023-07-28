const Anime = require("./db/CardData");
const cheerio = require("cheerio");
const axios = require("axios");

const puppeteer = require("puppeteer")
async function ChineseAnime(url="https://www.chineseanime.org/") {
  await Anime.deleteMany({});
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
        const link = $(element).find("a").attr("href");
        
        const videoUrl = await getVideoUrlChinese(link);
        const check = await Anime.find({title:title})
        console.log(check.length)
        const animeCard = {
          title,
          subtitle,
          episode,
          imageUrl,
          videoUrl,
          source:"Chinese",
        }
        if(check.length < 1 )
        {
          await Anime.insertMany(animeCard)
          sayac++;
          console.log("Başlık:", title);
          console.log("Bölüm:", episode);
          console.log("Altyazı:", subtitle);
          console.log("Resim URL:", imageUrl);
          console.log("Link:", videoUrl);
          console.log("=".repeat(40));
        }
        index++;
        
      }
    } catch (error) {
      console.log("Web sayfasına ulaşılamadı!", error);
    }
  }
  
  
  async function getVideoUrlChinese(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
  
    // "All subtitle player 2" seçeneğini otomatik olarak seçmek için seçiciyi ve değeri bulma
    let dataIndexValue = '2';
    const selectElement = await page.waitForSelector("select[name='mirror']");
    let option = await selectElement.$(`option[data-index='${dataIndexValue}']`);
  
    if (option) {
      const optionValue = await (await option.getProperty('value')).jsonValue();
      await selectElement.select(optionValue);
    } else {
      dataIndexValue = '1'
      option = await selectElement.$(`option[data-index='${dataIndexValue}']`);
      if(option) {
        const optionValue = await (await option.getProperty('value')).jsonValue();
        await selectElement.select(optionValue);
      }
      else{
        await browser.close();
        return null;
      }
    }
  
    // "All subtitle player 2" seçeneği seçildikten sonra içeriğin yüklenmesini bekleyelim
  
    // #pembed altındaki içeriği al
    const videoContent = await page.evaluate(() => {
      const pembedElement = document.querySelector("#pembed");
      if (pembedElement) {
        const videoElement = pembedElement.querySelector("iframe");
        if (videoElement) {
          return videoElement.getAttribute("src");
        }
      }
    });
  
    await browser.close();
  
    return videoContent;
  }

module.exports = ChineseAnime;