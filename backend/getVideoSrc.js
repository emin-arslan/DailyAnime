const puppeteer = require("puppeteer");

async function getVideoSrc() {
  console.log("here1");
  const url = "https://www.turkanime.co/video/tobira-wo-akete-movie";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const btnGroup = await page.waitForSelector(".panel-body .pull-right");

  if (!btnGroup) {
    console.log("Element not found.");
    await browser.close();
    return null;
  }

  const firstButton = await btnGroup.$("button");
  await page.evaluate((button) => button.click(), firstButton);

  const hdVidButton = await page.waitForXPath("//button[contains(., ' HDVID')]");
  if (!hdVidButton) {
    console.log("HDVID button bulunamadı.");
    await browser.close();
    return null;
  }

  await page.evaluate((button) => button.click(), hdVidButton);

  const mainIframe = await page.waitForSelector(".video-icerik iframe");
  if (mainIframe) {
    const iframeSrc = await mainIframe.evaluate((iframe) => iframe.src);
    await browser.close();
    return iframeSrc;
  } else {
    console.log("Iframe not found.");
    await browser.close();
    return null;
  }
}

module.exports = getVideoSrc;
