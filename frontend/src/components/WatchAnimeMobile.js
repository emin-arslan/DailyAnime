import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimeAction } from "./redux/actions/action";
import { useLocation } from "react-router-dom";
import { searchAnime } from "./redux/selector";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AnimeInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("query");
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const animeInfo = useSelector(searchAnime);

  useEffect(() => {
    dispatch(getAnimeAction(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (animeInfo.episodes && animeInfo.episodes[episodeIndex]) {
      setSelectedPlayer(
        animeInfo.episodes[episodeIndex].watch_link_1 ||
          animeInfo.episodes[episodeIndex].watch_link_2 ||
          animeInfo.episodes[episodeIndex].watch_link_3 ||
          ""
      );
    }
  }, [animeInfo, episodeIndex]);

  const handlePlayerChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const anime = {
    title: animeInfo.name,
    episodes: animeInfo.episodes,
  };

  const handlePreviousEpisode = () => {
    if (episodeIndex > 0) {
      setEpisodeIndex(episodeIndex - 1);
    }
  };

  const handleNextEpisode = () => {
    if (anime.episodes && episodeIndex < anime.episodes.length - 1) {
      setEpisodeIndex(episodeIndex + 1);
    }
  };

  return (
    <div className="h-full min-h-screen bg-[#353636] text-gray-200 flex flex-col items-center p-0">
      <h1 className="text-md font-bold p-2 w-full">{anime.title}</h1>
      {anime.episodes && (
        <div className="flex flex-col w-full max-w-4xl">
          <div className="relative w-full mb-4">
            <iframe
              src={selectedPlayer}
              className="w-full h-52 md:h-64 object-cover shadow-lg"
              title={`Episode ${episodeIndex + 1}`}
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex justify-between items-center w-full mb-4">       
            <select
              className="bg-[#252525] text-white text-xs px-3 py-1 rounded-lg shadow-md hover:bg-[#444444]"
              onChange={handlePlayerChange}
              value={selectedPlayer}
            >
              {anime.episodes[episodeIndex].watch_link_1 && (
                <option  className="" value={anime.episodes[episodeIndex].watch_link_1}>
                  Player 1
                </option>
              )}
              {anime.episodes[episodeIndex].watch_link_2 && (
                <option value={anime.episodes[episodeIndex].watch_link_2}>
                  Player 2
                </option>
              )}
              {anime.episodes[episodeIndex].watch_link_3 && (
                <option value={anime.episodes[episodeIndex].watch_link_3}>
                  Player 3
                </option>
              )}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={handlePreviousEpisode}
                className="bg-[#252525] text-white text-xs px-3 py-1 rounded-lg shadow-md hover:bg-[#444444] transition-colors duration-300"
              >
                Önceki Bölüm
              </button>
              <button
                onClick={handleNextEpisode}
                className="bg-[#252525] text-white text-xs px-3 py-1 rounded-lg shadow-md hover:bg-[#444444] transition-colors duration-300"
              >
                Sonraki Bölüm
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/4 p-1 bg-[#353535] rounded-lg shadow-lg overflow-y-auto h-64">
            <h2 className="text-xs font-semibold mb-4 px-1 border-b">Bölümler</h2>
            <ul className="space-y-2">
              {anime.episodes.map((episode, idx) => (
                <li
                  key={idx}
                  className={`flex text-xs justify-between items-center p-2 rounded-lg shadow-md hover:bg-[#444444] transition-colors duration-300 cursor-pointer ${
                    episodeIndex === idx ? "bg-[#444444]" : "bg-[#353636]"
                  }`}
                  onClick={() => setEpisodeIndex(idx)}
                >
                  <span>{`Bölüm ${episode.episode_number}`}</span>
                  <span className="text-sm text-gray-400">{episode.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeInfo;
