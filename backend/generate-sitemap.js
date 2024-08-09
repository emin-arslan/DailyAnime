const express = require("express");
const cors = require("cors");
const fs = require('fs');
const mongoose = require("mongoose");
const AnimeInfo = require("./db/AnimeInfo");
const AnimeEpisode = require("./db/AnimeEpisode");
require("./db/config")
const app = express();




function escapeXML(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }
  
  async function generateSitemap() {
    try {
      const animes = await AnimeInfo.find().exec();
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;
  
      // Root URLs
      sitemap += `<url>\n  <loc>https://animeelysium.com/</loc>\n  <changefreq>daily</changefreq>\n  <priority>1.0</priority>\n</url>\n`;
      sitemap += `<url>\n  <loc>https://animeelysium.com/animeInfo/name</loc>\n  <changefreq>daily</changefreq>\n  <priority>0.8</priority>\n</url>\n`;
      sitemap += `<url>\n  <loc>https://animeelysium.com/mobile-anime/name</loc>\n  <changefreq>daily</changefreq>\n  <priority>0.8</priority>\n</url>\n`;
  
      for (const anime of animes) {
        const animeUrlName = encodeURIComponent(anime.NAME);
  
        // Add anime info page
        sitemap += `<url>\n  <loc>https://www.animeelysium.com/animeInfo/name?query=${escapeXML(animeUrlName)}</loc>\n  <changefreq>daily</changefreq>\n  <priority>0.8</priority>\n</url>\n`;
  
        // Add episode pages
        const episodes = await AnimeEpisode.find({ ANIME_ID: anime._id }).exec();
        for (const episode of episodes) {
          sitemap += `<url>\n  <loc>https://www.animeelysium.com/mobile-anime/name?query=${escapeXML(animeUrlName)}&amp;episode=${episode.EPISODE_NUMBER}</loc>\n  <changefreq>daily</changefreq>\n  <priority>0.8</priority>\n</url>\n`;
        }
  
        // Add category pages
        for (const category of anime.CATEGORIES) {
          const categoryUrlName = encodeURIComponent(category);
          sitemap += `<url>\n  <loc>https://www.animeelysium.com/categories/category?query=${escapeXML(categoryUrlName)}</loc>\n  <changefreq>daily</changefreq>\n  <priority>0.8</priority>\n</url>\n`;
        }
      }
  
      sitemap += `</urlset>`;
  
      // Write to sitemap.xml
      fs.writeFileSync('./sitemap.xml', sitemap);
      console.log('sitemap.xml has been created successfully!');
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      mongoose.connection.close();
    }
  }

generateSitemap();
