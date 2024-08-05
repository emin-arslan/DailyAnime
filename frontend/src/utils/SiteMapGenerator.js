// generate-sitemap.js
const { SitemapStream } = require('sitemap');
const fs = require('fs');
const path = require('path');

// Sitemap stream'i oluştur
const sitemap = new SitemapStream({ hostname: 'https://animeelysium.com' });

// URL'leri belirtin
const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/animeInfo/name', changefreq: 'daily', priority: 0.8 },
  // Diğer URL'ler
];

// URL'leri sitemap'e ekleyin
urls.forEach(url => sitemap.write(url));
sitemap.end();

// Sitemap'i dosyaya yazın
const writeStream = fs.createWriteStream(path.join(__dirname, '../../public/sitemap.xml'));

sitemap.pipe(writeStream).on('finish', () => {
  console.log('Sitemap has been created successfully!');
}).on('error', (err) => {
  console.error('Error creating sitemap:', err);
});
