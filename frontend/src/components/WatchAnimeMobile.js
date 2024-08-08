import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnimeAction } from "./redux/actions/action";
import { useLocation, useNavigate } from "react-router-dom";
import { searchAnime } from "./redux/selector";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WatchAnimeMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("query");
  const activeEpisode = queryParams.get("episode");
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const animeInfo = useSelector(searchAnime);
  const episodeRefs = useRef([]);
  const episodeListRef = useRef(null);

  useEffect(() => {
    dispatch(getAnimeAction(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (animeInfo.episodes && activeEpisode) {
      const episodeIdx = animeInfo.episodes.findIndex(
        (episode) => episode.episode_number === parseInt(activeEpisode, 10)
      );
      if (episodeIdx !== -1) {
        setEpisodeIndex(episodeIdx);
      }
    }
  }, [animeInfo.episodes, activeEpisode]);

  const scrollToActiveEpisode = () => {
    const activeEpisodeElement = episodeRefs.current[episodeIndex];
    if (activeEpisodeElement) {
      activeEpisodeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    if (animeInfo.episodes && animeInfo.episodes[episodeIndex]) {
      setSelectedPlayer(
        animeInfo.episodes[episodeIndex].watch_link_1 ||
          animeInfo.episodes[episodeIndex].watch_link_2 ||
          animeInfo.episodes[episodeIndex].watch_link_3 ||
          ""
      );
      scrollToActiveEpisode();
    }
  }, [animeInfo.episodes, episodeIndex]);

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page scroll is at the top
  }, []);

  const handlePlayerChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const anime = {
    title: animeInfo.name,
    episodes: animeInfo.episodes,
    seasonNumber: animeInfo.seasonNumber
  };

  const handlePreviousEpisode = () => {
    if (episodeIndex > 0) {
      setEpisodeIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextEpisode = () => {
    if (anime.episodes && episodeIndex < anime.episodes.length - 1) {
      setEpisodeIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleEpisodeClick = (index) => {
    setEpisodeIndex(index);
  };

  const handleAnimeInfo = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/animeInfo/name?query=${encodedName}`);
  };

  return (
    <div className="h-full min-h-screen bg-[#353636] text-gray-200 flex flex-col items-center p-0">
      <div className="flex w-full"> 
      <h1 className="text-sm w-9/12 font-bold p-2 ">{anime.title}</h1>
      <div className="w-3/12 flex justify-end py-1 h-auto"> 
          <button
                onClick={()=>{handleAnimeInfo(animeInfo.name)}}
                className="bg-[#252525] w-auto h-8 items-center justify-center flex text-white text-xs px-2 py-1 shadow-md hover:bg-[#444444] transition-colors duration-300"
              >
                Animeye Git
                </button>
          </div>
      </div>
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
                <option value={anime.episodes[episodeIndex].watch_link_1}>
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
          <div
            className="flex flex-col w-full md:w-1/4 p-1 bg-[#353535] rounded-lg shadow-lg overflow-y-auto h-64"
            ref={episodeListRef}
          >
            
            <h2 className="text-xs font-semibold mb-4 px-1 border-b">{anime.seasonNumber && anime.seasonNumber + ".Sezon"} Bölümler</h2>
            <ul className="space-y-2">
              {anime.episodes.map((episode, idx) => (
                <li
                  key={idx}
                  ref={(el) => (episodeRefs.current[idx] = el)}
                  className={`flex text-xs justify-between items-center p-2 rounded-lg shadow-md hover:bg-[#444444] transition-colors duration-300 cursor-pointer ${
                    episodeIndex === idx ? "bg-[#444444]" : "bg-[#353636]"
                  }`}
                  onClick={() => handleEpisodeClick(idx)}
                >
                  <span>{`Bölüm ${episode.episode_number}`}</span>
                  
                  <span className="text-sm text-gray-400">{episode.title}</span>
                  <span className="text-end">{episode.type?.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchAnimeMobile;
