const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const getCoverImage = require("./getCoverImage");

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
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath, // executablePath belirtin
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    ignoreDefaultArgs: ['--disable-extensions']
  });

  const url = "https://www.turkanime.co";
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
    
    // ... Diğer verileri çekme işlemleri ...

    const videoUrl = await getVideoSrc(link);
    const orginalImageUrl = await getCoverImage(title.match(/^(.*?)(?=\d+\.\s)/)[0]);
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
      executablePath: await chromium.executablePath, // executablePath belirtin
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
      ignoreDefaultArgs: ['--disable-extensions']
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
        try {
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
        } catch (error) {
          try {
            // If ALUCARD button not found, try GDRIVE
            console.log("ALUCARD button not found, trying GDRIVE...");
            const gdriveButton = await page.waitForXPath(
              "//button[contains(., ' GDRIVE')]",
              { timeout: 5000 }
            );
            await page.evaluate((button) => button.click(), gdriveButton);
            // Wait for the content to load
            const mainIframe = await page.waitForSelector(".video-icerik iframe");

            if (mainIframe) {
              iframeSrc = await mainIframe.evaluate((iframe) => iframe.src);
            }
          } catch (error) {
            console.log("GDRIVE button not found.");
          }
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
