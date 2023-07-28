const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

process.setMaxListeners(0);
const animeData = [];
const retryQueue = [];

async function TrAnime() {
    try {
      const response = await axios.get("https://www.tranimeizle.co/");
      const source = "TranimeIzle";
      const $ = cheerio.load(response.data);
      
      await Promise.all(
        $(".flex-wrap-layout .flx-block").map(async (index, element) => {
          const imageUrl = $(element).find("img.img-responsive").attr("src");
          const title = $(element).find(".bar h4").text().trim();
          const episode = $(element).find(".info-chip").eq(1).text().trim();
          const watchLink =
            "https://www.tranimeizle.co" +
            $(element).find(".info-chip a").attr("href");
  
          const videoUrl = await getVideoUrlAfterClick(watchLink);
  
          if (videoUrl) {
            animeData.push({
              imageUrl,
              title,
              episode,
              watchLink,
              source,
              videoUrl,
            });
          } else {
            retryQueue.push({
              imageUrl,
              title,
              episode,
              watchLink,
              source,
              videoUrl,
            });
          }
        })
      );
  
      while (retryQueue.length > 0) {
        const animeInfoToRetry = retryQueue.pop();
        const videoUrl = await getVideoUrlAfterClick(animeInfoToRetry.watchLink);
  
        if (videoUrl) {
          animeData.push({
            ...animeInfoToRetry,
            videoUrl,
          });
        }
      }
  
      return animeData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

async function getVideoUrlAfterClick(animeUrl) {
  const preparePageForTests = async (page) => {
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

    await page.goto(animeUrl);
    page.waitForTimeout(1000);
    const sourceListItems = await page.$$(".videoSource-items ol li.sourceBtn");

    let aitrVipButton = null;
    const maxRetries = 20;
    let retryCount = 0;

    while (!aitrVipButton && retryCount < maxRetries) {
      for (const item of sourceListItems) {
        const buttonTitle = await item.$eval("p.title", (el) =>
          el.innerText.trim()
        );
        if (buttonTitle.includes("AitrVip")) {
          aitrVipButton = item;
          break;
        }
      }

      if (!aitrVipButton) {
        await page.waitForTimeout(1000);
        retryCount++;
      }
    }

    if (aitrVipButton) {
      await aitrVipButton.click();
    } else {
      throw new Error("AitrVip seçeneği bulunamadı.");
    }

    if (aitrVipButton) {
      await aitrVipButton.click();

      await page.waitForSelector(".videoSource-video-player iframe", {
        visible: true,
        timeout: 2000,
      });

      const videoPlayerDivContent = await page.evaluate(() => {
        const div = document.querySelector(".videoSource-video-player iframe");
        return div ? div.src : null;
      });

      console.log("Div içeriği:", videoPlayerDivContent);
      return videoPlayerDivContent;
    } else {
      throw new Error("AitrVip seçeneği bulunamadı.");
    }
  } catch (error) {
    console.error("Hata:", error);
    return null;
  } finally {
    try {
      if (process.platform === "win32") {
        await browser.close();
      } else {
        await browser.process().kill("SIGINT");
      }
    } catch (err) {
      console.error("Hata:", err);
    }
  }
}


module.exports = TrAnime;