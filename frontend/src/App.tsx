import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './components/HomePage';
import { getHomePageAnimes } from './components/redux/actions/action';
import { getHomePageAnimesSelector } from './components/redux/selector';
import { Analytics } from "@vercel/analytics/react"
import Navi from './components/navi/Navi';
import Container from './components/Container';
import MediaPlayer from './components/MediaPlayer';
import Player from './components/Player';

const App = () => {
  const [activeAnime, setActiveAnime] = useState({})
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch();
  const homePageAnimes = useSelector(getHomePageAnimesSelector);

  useEffect(() => {
    dispatch(getHomePageAnimes(5)); // İstediğiniz sayıda animeyi getirin
  }, [dispatch]);

  return (
    <div className="w-full h-auto relative transition-all bg-gray-900">
      <Navi/>
      <Container><HomePage homePageAnimes={homePageAnimes} setActiveAnime ={setActiveAnime} setModal={setModal} /></Container>
      <Player modal={modal} activeAnime={activeAnime} setModal={setModal} />
      <Analytics/>
    </div>
  );
};

export default App;
