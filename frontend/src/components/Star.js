import React from "react";
import IconSVG from "../icons/IconSVG";
import { useDispatch } from "react-redux";
import { setFavoriAnimes } from "./redux/actions/action";

const Star = ({ fill, anime}) => {
  const dispacth = useDispatch();

  const FavoriteAnime = (anime) => {
    const getItems = localStorage.getItem("favoriAnimes");
    if (getItems) {
      let array = Array.from(JSON.parse(getItems));
      const found = array.find(
        (animeCard) => animeCard.title === anime.title
      );
      if (found) {
        const tempArray = array.filter((e) => e.title !== anime.title);
        localStorage.setItem("favoriAnimes", JSON.stringify(tempArray));
      }
      else
      {
        array.push(anime);
        localStorage.setItem("favoriAnimes", JSON.stringify(array));
      }
    }
    dispacth(setFavoriAnimes());
  };

  return (
    <div className="w-10 h-10 centered-items z-50 select-none hover:cursor-pointer">
      <div
        onClick={(e) => {FavoriteAnime(anime); e.stopPropagation();}}
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
