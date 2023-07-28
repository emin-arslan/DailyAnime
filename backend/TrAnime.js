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

    console.log(animeData);
    return animeData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function getVideoUrlAfterClick() {
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
    await page.goto(
      "https://www.tranimeizle.co/jidou-hanbaiki-ni-umarekawatta-ore-wa-meikyuu-wo-samayou-4-bolum-izle"
    );

    // Beklenen öğeyi seçene kadar sayfanın yüklenmesini bekle

    // Beklenen öğeyi seçin (Bu örnekte ilk <li> öğesini seçiyoruz)
    const liElement = await page.$("[class='videoSource']");
    console.log(liElement);
    // Öğeye tıklayın
    await liElement.click();

    // Beklenen öğeyi seçene kadar sayfanın yüklenmesini bekle (iframe'in yüklenmesi için)
    await page.waitForSelector("#videoPlayer iframe");

    // Beklenen öğeyi seçin (Bu örnekte iframe'i seçiyoruz)
    const iframeElement = await page.$("#videoPlayer iframe");

    // iframe'in src özelliğini alın
    const videoUrl = await iframeElement.evaluate((iframe) => iframe.src);

    console.log("Video URL:", videoUrl);

    // İşlemi tamamlayın ve tarayıcıyı kapatın
    await browser.close();

    return videoUrl;
  } catch (error) {
    console.error("Hata oluştu:", error);
    await browser.close();
    return null;
  }
}

module.exports = TrAnime;
