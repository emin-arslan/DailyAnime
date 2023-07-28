const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getPageContent(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Sayfa içeriği çekilemedi: ' + error.message);
    }
  }
  
  async function checkPageContent(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      const htmlContent = await getPageContent(url);
      const $ = cheerio.load(htmlContent);
  
      const imageURLs = [];
      // Sayfa içerisindeki resim URL'lerini al
      $('.captcha-modal__icons .captcha-image').each((index, element) => {
        const style = $(element).attr('style');
        const match = style.match(/url\('(.*)'\)/);
        if (match) {
          imageURLs.push(match[1]);
        }
      });
  
      const uniqueURLs = new Set(imageURLs);
      if (uniqueURLs.size === 2) {
        const imageToClick = imageURLs.find(url => imageURLs.filter(u => u === url).length === 1);
  
        if (imageToClick) {
          await page.goto(url);
  
          // Farklı olan resmin URL'sine tıklama işlemi
          await page.click(`div[captcha-image][style*="${imageToClick}"]`);
          console.log('Farklı olan resme tıklandı.');
        } else {
          console.log('Farklı olan resim bulunamadı.');
        }
      } else {
        console.log('5 farklı resim bulunamadı.');
      }
  
      await browser.close();
    } catch (error) {
      console.error('Hata:', error.message);
      await browser.close();
    }
  }
// Fonksiyonu çağır ve işlemi gerçekleştir

module.exports = checkPageContent
