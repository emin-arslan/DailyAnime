import React from "react";
import { useSelector } from "react-redux";
import { getFavoriAnimes } from "./redux/selector";

const WatchedBanner = ({ anime }) => {
  const favoriAnimes = useSelector(getFavoriAnimes);
  const checkIsWatchedEpisode = () => {
    if (favoriAnimes) {
      const found = favoriAnimes.find(
        (animeCard) => animeCard.title === anime.title
      );
      if (found) {
        if (found.episode !== anime.episode) {
          let foundEpisode = found.episode.match(/Episode (\d+)/)[1]
          let lastEpisode = anime.episode.match(/Episode (\d+)/)[1]

          return <span className="text-green-200">{ lastEpisode - foundEpisode > 1 ? `${lastEpisode - foundEpisode} Yeni bölüm! Son izlenen: ${foundEpisode}`:"Yeni Bölüm!" }</span>;
        } else if (found.episode === anime.episode && !found.isWatchedAnime)
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
