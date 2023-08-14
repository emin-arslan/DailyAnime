import React, { useState } from "react";
import IconSVG from "../icons/IconSVG";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriAnimes } from "./redux/actions/action";

const Star = ({ fill, animeTitle, animeEpisode, isWatchedAnime }) => {
  const dispacth = useDispatch();
  const anime = {
    animeTitle,
    animeEpisode,
    isWatchedAnime,
  };

  const setFavoriAnime = (anime) => {
    const getItems = localStorage.getItem("favoriAnimes");
    if (getItems) {
      let array = Array.from(JSON.parse(getItems));
      const found = array.find(
        (animeCard) => animeCard.animeTitle === anime.animeTitle
      );
      if (found) {
        console.log("girdi")
        const tempArray = array.filter((e) => e.animeTitle !== anime.animeTitle);
        localStorage.setItem("favoriAnimes", JSON.stringify(tempArray));
      }
      else
      {
        array.push(anime);
        localStorage.setItem("favoriAnimes", JSON.stringify(array));
      }
    }
    dispacth(setFavoriAnimes());
    // if (getItems) {
    //   let array = Array.from(JSON.parse(getItems));

    //   if (array.indexOf(anime) < 0) {
    //     
    //   } else {
    //     const tempArray = array.filter((e) => e !== anime);
    //     localStorage.setItem("favoriAnimes", JSON.stringify(tempArray));
    //   }
    // } else {
    //   let favoriAnimes = [anime];
    //   localStorage.setItem("favoriAnimes", JSON.stringify(favoriAnimes));
    // }
    // dispacth(setFavoriAnimes());
  };

  return (
    <div className="w-10 h-10 centered-items z-50 select-none">
      <div
        onClick={() => setFavoriAnime(anime)}
        className={`w-8 h-8 rounded-full h-cursor-p hover:animate-pulse flex items-center justify-center transition-all ${
          fill
            ? "active:bg-[#f3b12e9e] dark:active:bg-[#f3b12e9e]"
            : "active:bg-[#f3a15414] dark:active:bg-[#00021f72]"
        }`}
      >
        <IconSVG
          name={fill ? "starFill" : "starBorder"}
          fill={fill ? "orange" : "orange"}
          width={28}
          height={28}
        />
      </div>
    </div>
  );
};

export default Star;
