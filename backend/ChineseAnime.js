const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");

async function ChineseAnime(url = "https://www.chineseanime.org/") {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const articles = $("article.bs");
    let index = 0;
    let sayac = 0;
    const animeCards = [];

    while (sayac < 18) {
      const element = articles[index];
      const title = $(element).find("h2[itemprop='headline']").text();
      const episode = $(element).find("span.epx").text();
      const subtitle = $(element).find("span.sb.Sub").text();
      const imageUrl = $(element).find("img").attr("src");
      const watchLink = $(element).find("a").attr("href");

      let videoUrl = null;
      let tryCount = 0;
      while (tryCount < 3 && !videoUrl) {
        videoUrl = await getVideoUrlChinese(watchLink);
        tryCount++;
      }

      const animeCard = {
        title,
        subtitle,
        episode,
        imageUrl,
        videoUrl,
        watchLink,
        source: "Chinese",
      };

      console.log(animeCard);
      if (!animeCards.find((card) => card.title == title)) {
        animeCards.push(animeCard);
        sayac++;
      }

      index++;
    }

    return animeCards;
  } catch (error) {
    console.log("wtf", error);
  }
}


async function getVideoUrlChinese(url) {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 60000,
  });

  const page = await browser.newPage();
  try {
    await page.goto(url, { timeout: 5000 });

    // "All subtitle player 2" seçeneğini otomatik olarak seçmek için seçiciyi ve değeri bulma
    let dataIndexValue = "2";
    const selectElement = await page.waitForSelector("select[name='mirror']");
    let option = await selectElement.$(`option[data-index='${dataIndexValue}']`);

    if (option) {
      const optionValue = await (await option.getProperty('value')).jsonValue();
      await selectElement.select(optionValue);
    } else {
      dataIndexValue = "1";
      option = await selectElement.$(`option[data-index='${dataIndexValue}']`);
      if (option) {
        const optionValue = await (await option.getProperty('value')).jsonValue();
        await selectElement.select(optionValue);
      } else {
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
  } catch (error) {
    console.log("An error occurred while getting video URL:", error);
    await browser.close();
    return null;
  }
}


module.exports = ChineseAnime;
