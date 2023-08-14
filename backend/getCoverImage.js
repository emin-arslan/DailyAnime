
const puppeteer = require("puppeteer")

const baseUrl = "https://myanimelist.net/search/all?q=";

async function getCoverImage(searchTerm) {
  const maxRetryCount = 3; // Maksimum deneme sayısı
  let retryCount = 0; // Deneme sayacı

  while (retryCount < maxRetryCount) {
    try {
      const url = baseUrl + encodeURIComponent(searchTerm);

      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();
      await page.goto(url);

      // Bekleme süresi ve kullanıcı etkileşimleri burada gerçekleştirilebilir.
      // Örneğin: await page.waitForSelector('.title');

      const firstButton = await page.waitForSelector(".title");
      if (firstButton) {
        await firstButton.click();
        await page.waitForNavigation({ waitUntil: "domcontentloaded" });

        // "leftside" div'inin içerisindeki ilk <img> etiketinin src özelliğini bulma
        await page.waitForTimeout(2000);
        const leftSideDiv = await page.waitForSelector(".leftside");
        console.log("leftside bulundu....!")
        const imgInLeftSideDivSrc = await leftSideDiv.evaluate((div) => {
          const imgElement = div.querySelector("img.lazyloaded");
          return imgElement ? imgElement.getAttribute("src") : null;
        });

        if (imgInLeftSideDivSrc) {
          await browser.close();
          return imgInLeftSideDivSrc;
        } else {
          console.log("leftside div içinde resim kaynağı bulunamadı.");
        }

        await browser.close();
      }
    } catch (error) {
      console.log("Hata oluştu. Yeniden deneyin.");
      retryCount++;
    }
  }

  console.log("Maksimum deneme sayısına ulaşıldı. İşlem başarısız.");
  return null;
}

module.exports = getCoverImage;
