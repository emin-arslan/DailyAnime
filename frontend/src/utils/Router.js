// src/Router.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MainForm from './components/MainForm';
import AnimeInfo from './components/AnimeInfo';
import ErrorPage from './components/ErrorPage';
import { getHomePageAnimesSelector } from './components/redux/selector';
import WatchAnimeMobile from '../components/WatchAnimeMobile';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="animeInfo/:name" element={<AnimeInfo />} />
    <Route path='mobile-anime/:name' element={<WatchAnimeMobile/>} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default Router;