import React from "react";
import { useSelector } from "react-redux";

const WatchedBanner = ({ anime }) => {
  const favoriAnimes = useSelector((state) => state.animeReducer.favoriAnimes);
  const checkIsWatchedEpisode = () => {
    if (favoriAnimes) {
      const found = favoriAnimes.find(
        (animeCard) => animeCard.animeTitle === anime.title
      );
      if (found) {
        if (found.animeEpisode !== anime.episode) {
          console.log("hello");
          return <span className="text-green-200">Yeni Bölüm!</span>;
        } else if (found.animeEpisode === anime.episode && !found.isWatchedAnime)
          return (
            <span className="text-yellow-400">
              Favori animen! Henüz izlemedin.
            </span>
          );
        return <span className="text-red-400">Daha önce izlendi.</span>;
      }
      return null;
    }
  };
  return (
    <div className="absolute w-full bg-[#07002159] text-center top-[50%]">
      <span className="text-gray-400 font-poppins text-xs ">
        {checkIsWatchedEpisode()}
      </span>
    </div>
  );
};

export default WatchedBanner;
