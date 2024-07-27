import React, { useEffect, useState } from "react";
import Navi from "./components/navi/Navi";
import Player from "./components/Player";

import { useDispatch, useSelector } from "react-redux";
import { getAnimeDatas } from "./components/redux/actions/action";
import { getAnimeCards } from "./components/redux/selector";
import HomePage from "./components/HomePage";
import { Analytics } from "@vercel/analytics/react"
import { FavoriteAnimeCard } from "./types/Anime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AnimeForm from "./components/AnimeForm";
import MainPage from "./components/MainPage";
import AnimeInfo from "./components/AnimeInfo";
import axios from "axios";
import AccessDenied from "./components/AccesDenided";

function App() {
  const dispatch = useDispatch();
  const [video, setVideo] = useState("")
  const [modal, setModal] = useState(false)
  const [searchTxt, setSearchTxt] = useState("");
  const [animeListingType, setAnimeListingType] = useState("All");
  const [isFound, setIsFound] = useState(true);
  
  const [accessDenied, setAccessDenied] = useState(false);

  const anime = useSelector(getAnimeCards);



  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
     
    },
    {
      path: 'anime',
      element: <AnimeForm/>
    },
    {
      path: 'animeInfo',
      element: <AnimeInfo />
    }
    
  ]);


  useEffect(()=>{
    dispatch(getAnimeDatas());
  },[dispatch])

  let filteredAnimes = anime;

  const favoriAnimesJson = localStorage.getItem("favoriAnimes") ?? "[]";
  const favoriAnimes: FavoriteAnimeCard[] = JSON.parse(favoriAnimesJson);

  if(favoriAnimes.length < 1)
  {
    localStorage.setItem("favoriAnimes", JSON.stringify([]));
  }

  switch(animeListingType)
  {
    case "Favorites":
      filteredAnimes = favoriAnimes;
      break;
    case "WatchedList":
      filteredAnimes = favoriAnimes.filter((animeItem) => animeItem.isWatchedAnime);
      break;
    case "All":
      filteredAnimes = anime;
      break;
  }

  if(filteredAnimes.length < 1 && isFound) setIsFound(false);

  if(searchTxt.length > 0)
  {
    const temp_array = filteredAnimes.filter(anime => anime.title.toLowerCase().includes(searchTxt.toLowerCase()));
    if(temp_array.length > 0)
    {
      filteredAnimes = temp_array;
    }
    else if(isFound) setIsFound(false);
    if(temp_array.length > 0 && !isFound) setIsFound(true);
  }

  else if(filteredAnimes.length > 0 && !isFound) setIsFound(true);


  useEffect(() => {
    const checkAccess = async () => {
      try {
        console.log("oy")
        await axios.get('https://daily-anime-omega.vercel.app/'); // Backend URL
      } catch (error:any) {
        console.log(error)
        if (error.response && error.response.status === 400) {
          setAccessDenied(true);
        }
      }
    };

    checkAccess();
  }, []);

  if (accessDenied) {
    return <AccessDenied />;
  }


  return (
    <div className="w-full relative transition-all bg-gray-900 h-screen">
      <Navi searchTxt={searchTxt} setSearchTxt={setSearchTxt} setModal={setModal} animeListingType={animeListingType} setAnimeListingType={setAnimeListingType} />
      <RouterProvider router={router}/>
    </div>
   
  );
}

export default App;
