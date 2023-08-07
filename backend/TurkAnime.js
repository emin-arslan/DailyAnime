const puppeteer = require("puppeteer");
const getCoverImage = require("./getCoverImage")

function extractEpisodeNumber(text) {
  const regex = /(\d{1,3})\.\s*Bölüm/i;
  const match = text.match(regex);
  if (match && match[1]) {
    return parseInt(match[1]);
  } else {
    return null;
  }
}

async function TurkAnime() {
  const url = "https://www.turkanime.co";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const cookies = [{}];
  console.log("sea");
  await page.goto(url);
  console.log("ase");
  await page.waitForSelector(".panel-visible");
  console.log("hehehe");

  const divElements = await page.$$(".panel-visible.panel");
  console.log(divElements);
  const animeCards = [];

  for (const element of divElements) {
    const title = await element.$eval(".panel-title a", (el) =>
      el.getAttribute("data-original-title")
    );
    const thumbnailElement = await element.$("a.thumbnail");
    const imageUrl = await thumbnailElement.$eval("img", (img) =>
      img.getAttribute("data-src")
    );
    const link = await thumbnailElement.evaluate((el) =>
      el.getAttribute("href")
    );
    const fansub = await element.$eval(".row .bold.media-object", (el) =>
      el.textContent.trim()
    );
    const translator = await element.$eval(
      ".row .media-object:last-child a",
      (el) => el.getAttribute("href")
    );
    const dateAdded = await element.$eval(".row .fa-clock", (el) =>
      el.getAttribute("data-original-title")
    );

    const videoUrl = await getVideoSrc(link);
    console.log(title.match(/^[^\d]+/)[0])
    const orginalImageUrl =  await getCoverImage(title.match(/^[^\d]+/)[0]);
    const animeCard = {
      title: title,
      imageUrl: orginalImageUrl ? orginalImageUrl : imageUrl,
      videoUrl: videoUrl,
      episode: "Episode " + extractEpisodeNumber(title),
      source: "TurkAnime",
      watchLink: link,
    };
    console.log(animeCard);
    animeCards.push(animeCard);
  }

  await browser.close();

  return animeCards;
}

async function preparePageForTests(page) {
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
}

async function getVideoSrc(videoUrl) {
  const url = videoUrl;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--cookie="_ga_2SSTLBYBZR=GS1.1.1690993523.2.0.1690993526.57.0.0; _ga=GA1.1.1499097487.1690991007; cf_clearance=YV9_uQmSPDfyz.aBrIU2PoDbIUCYv5tF.lyD1wPOgTY-1690991006-0-1-6bbf0d55.64d57d.cc924d08-0.2.1690991006; _gid=GA1.2.448118527.1690991007; PHPSESSID=i39t3k6tnk1nqf1ktotgmel5si"',
      ],
    });
    const page = await browser.newPage();

    await preparePageForTests(page);

    console.log("geçtik");
    console.log(url);
    await page.goto("http:" + url);
    console.log("sa");

    // Wait for the panel body to load completely
    await page.waitForSelector(".panel-body");

    // Find the first button inside ".btn-group.pull-right" and click it
    const firstButton = await page.waitForSelector(".pull-right");
    if (firstButton) {
      await firstButton.click();
    }

    let iframeSrc = null;

    try {
      // Try to find HDVID button
      const hdVidButton = await page.waitForXPath(
        "//button[contains(., ' HDVID')]",
        { timeout: 5000 }
      );
      await page.evaluate((button) => button.click(), hdVidButton);
      // Wait for the content to load
      const mainIframe = await page.waitForSelector(".video-icerik iframe");

      if (mainIframe) {
        iframeSrc = await mainIframe.evaluate((iframe) => iframe.src);
      }
    } catch (error) {
      try {
        // If HDVID button not found, try FILEMOON
        console.log("HDVID button not found, trying FILEMOON...");
        const filemoonButton = await page.waitForXPath(
          "//button[contains(., ' FILEMOON')]",
          { timeout: 5000 }
        );
        await page.evaluate((button) => button.click(), filemoonButton);
        // Wait for the content to load
        const mainIframe = await page.waitForSelector(".video-icerik iframe");

        if (mainIframe) {
          iframeSrc = await mainIframe.evaluate((iframe) => iframe.src);
        }
      } catch (error) {
        // If FILEMOON button not found, try ALUCARD
        console.log("FILEMOON button not found, trying ALUCARD...");
        const alucardButton = await page.waitForXPath(
          "//button[contains(., ' ALUCARD')]",
          { timeout: 5000 }
        );
        await page.evaluate((button) => button.click(), alucardButton);
        // Wait for the content to load
        const mainIframe = await page.waitForSelector(".video-icerik iframe");

        if (mainIframe) {
          iframeSrc = await mainIframe.evaluate((iframe) => iframe.src);
        }
      }
    }

    await browser.close();
    return iframeSrc;
  } catch (error) {
    console.error("Hata:", error);
    return null;
  }
}

module.exports = TurkAnime;
