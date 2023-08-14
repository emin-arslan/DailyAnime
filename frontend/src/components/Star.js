import React, { useState } from "react";
import IconSVG from "../icons/IconSVG";

const Star = ({ anime }) => {
  const [isFavori, setIsFavori] = useState(false);

  const setFavoriAnime = (anime) => {
    const getItems = localStorage.getItem("favoriAnimes");

    if (getItems) {
      let array = Array.from(JSON.parse(getItems));

      if (array.indexOf(anime) < 0) {
        array.push(anime);
        localStorage.setItem("favoriAnimes", JSON.stringify(array));
        setIsFavori(true);
      } else {
        const tempArray = array.filter((e) => e !== anime);
        localStorage.setItem("favoriAnimes", JSON.stringify(tempArray));
        setIsFavori(false);
      }
    } else {
      let favoriAnimes = [anime];
      localStorage.setItem("favoriAnimes", JSON.stringify(favoriAnimes));
    }
  };

  const abc = (anime) =>{
    const getItems = localStorage.getItem("favoriAnimes");
    if (getItems) {
      let array = Array.from(JSON.parse(getItems));
      if (array.indexOf(anime) > -1) {
        return true
      }
    }
    return false
  } 

  return (
    <div className="w-10 h-10 centered-items z-50 select-none">
      <div
        onClick={() => setFavoriAnime(anime)}
        className={`w-8 h-8 rounded-full h-cursor-p hover:animate-pulse flex items-center justify-center transition-all ${
          isFavori
            ? "active:bg-[#f3b12e9e] dark:active:bg-[#f3b12e9e]"
            : "active:bg-[#f3a15414] dark:active:bg-[#00021f72]"
        }`}
      >
        <IconSVG
          name={abc(anime) ? "starFill" : "starBorder"}
          fill={abc(anime) ? "orange" : "orange"}
          width={28}
          height={28}
        />
      </div>
    </div>
  );
};

export default Star;
