const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function TrAnime() {
  try {
    const response = await axios.get("https://www.tranimeizle.co/"); // Burada hedef web sitesinin URL'sini girin
    const source = "TranimeIzle";
    const $ = cheerio.load(response.data);
    const animeData = [];

    $(".flex-wrap-layout .flx-block").each((index, element) => {
      const imgSrc = $(element).find("img.img-responsive").attr("src");
      const animeTitle = $(element).find(".bar h4").text().trim();
      const episodeInfo = $(element).find(".info-chip").eq(1).text().trim();
      const watchLink =
        "https://www.tranimeizle.co" +
        $(element).find(".info-chip a").attr("href");

      animeData.push({
        imgSrc,
        animeTitle,
        episodeInfo,
        watchLink,
        source,
      });
      
    });
    getVideoUrlAfterClick();
    return animeData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
  
}

async function getVideoUrlAfterClick(animeUrl = "https://www.tranimeizle.co/rurouni-kenshin-meiji-kenkaku-romantan-2023-4-bolum-izle") {
  const preparePageForTests = async (page) => {
    // Pass the User-Agent Test.
    const userAgent =
      "Mozilla/5.0 (X11; Linux x86_64)" +
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
    await page.setUserAgent(userAgent);
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await preparePageForTests(page);

  try {
    const cookies = [
      {
        name: ".AitrWeb.Session",
        value:
          "CfDJ8DeMpL1wYptMhZhcRuIPrf8sDOQjFjBMegwQNUTxKOT6BL2u6nDL%2BNUkN0k0fsqvEfPPwfS2AV8XRZxLAehKBXFGqr7wIHyle1VEkckNV3bMaET5qdL6mcGQvGgIbvIY5gKmc1ibqgKkHkWALTnp8jXQg0VDfUtaxhmyg2mH1SDt",
        domain: "www.tranimeizle.co",
        url: animeUrl,
      },
      {
        name: ".AitrWeb.Verification",
        value: "CfDJ8DeMpL1wYptMhZhcRuIPrf8Txz2N4aw_eytkK_NFmoSe",
        domain: "www.tranimeizle.co",
        url: animeUrl,
      },
    ];

    await page.setCookie(...cookies);

    await page.goto(
      animeUrl
    );

    const sourceListItems = await page.$$(".videoSource-items ol li.sourceBtn");

    // "AitrVip" seçeneğini bulun ve üzerine tıklayın
    let aitrVipButton;
    for (const item of sourceListItems) {
      const buttonTitle = await item.$eval("p.title", (el) =>
        el.innerText.trim()
      );
      if (buttonTitle.includes("AitrVip")) {
        aitrVipButton = item;
        break;
      }
    }

    if (aitrVipButton) {
      await aitrVipButton.click();
    } else {
      throw new Error("AitrVip seçeneği bulunamadı.");
    }
    if (aitrVipButton) {
      await aitrVipButton.click();

      // "selected" classının eklenmesini bekleyin

      // Sayfada ".videoSource-video-player iframe" elemanını bekleyin
      await page.waitForSelector(".videoSource-video-player iframe", {
        visible: true,
        timeout: 400, // 10 saniye bekleme süresi
      });

      // '.videoSource-video-player' div'inin içeriğini alın
      const videoPlayerDivContent = await page.evaluate(() => {
        const div = document.querySelector(".videoSource-video-player iframe");
        return div ? div.src : null;
      });
      
      
    } else {
      throw new Error("AitrVip seçeneği bulunamadı.");
    }

   
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    await page.close(); // Sayfayı kapat
  }
}

module.exports = TrAnime;
