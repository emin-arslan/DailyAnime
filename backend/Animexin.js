const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer")

async function AnimeXin(url = "https://animexin.vip/") {
  const animeCards = [];

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const articles = $("article.bs");

    for (const element of articles) {
      const title = $(element).find("h2[itemprop='headline']").text();
      const episode = $(element).find(".eggepisode").text();
      const subtitle = $(element).find(".sb.Sub").text();
      const imageUrl = $(element).find("img").attr("src");
      const watchLink = $(element).find("a").attr("href");

      const videoUrl = await getVideoUrlAnimeXin(watchLink);

      const animeCard = {
        title,
        subtitle,
        episode,
        imageUrl,
        videoUrl,
        watchLink,
        source: "AnimeXin",
      };

      if (
        !animeCards.find((card) => card.title === title) &&
        animeCard.videoUrl != null
      ) {
        animeCards.push(animeCard);
      }

      // Assuming you want to return only 18 cards, you can add a check here:
      if (animeCards.length >= 18) {
        break; // This will exit the loop.
      }
    }

    return animeCards;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function getVideoUrlAnimeXin(url) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  let maxRetryCount = 3; // En fazla 3 kez tekrar deneme yapacak
  let currentRetry = 0;

  while (currentRetry < maxRetryCount) {
    try {
      await page.goto(url);

      const desiredOptionNames = [
        'All Sub Player Daylimotion (have much ads from video player)',
        'All Sub Player Daylimotion',
        'All Sub Player Dailymotion'
      ];

      const selectElement = await page.waitForSelector("select.mirror");
      const options = await page.evaluate(() => {
        const optionElements = Array.from(document.querySelectorAll("select.mirror option"));
        return optionElements.map(option => ({
          name: option.innerText.trim(),
          value: option.value,
        }));
      });

      let optionValue = null;
      for (const option of options) {
        if (desiredOptionNames.includes(option.name)) {
          optionValue = option.value;
          break;
        }
      }

      if (optionValue) {
        await selectElement.select(optionValue);
      } else {
        await browser.close();
        return null;
      }

      // "All Sub Player Dailymotion" veya "All Sub Player Daylimotion" seçeneği seçildikten sonra içeriğin yüklenmesini bekleyelim

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
    } catch (error) {
      console.error("Error:", error);
      currentRetry++;

      if (currentRetry < maxRetryCount) {
        // Hata alındı, bekleyip tekrar deneme yapalım
        console.log(`Retrying... Attempt ${currentRetry}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // 3 saniye bekleyelim
      } else {
        // Max tekrar deneme sayısını aştık, tarayıcıyı kapatıp null döndürelim
        console.log("Max retry count exceeded. Giving up.");
        await browser.close();
        return null;
      }
    }
  }
}

  module.exports = AnimeXin;
  