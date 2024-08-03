import React, { useEffect, useState, useRef } from "react";

const Player = ({ modal, activeAnime, setModal }) => {
  const [episodeNumber, setEpisodeNumber] = useState(-1);
  const [isEpisodesVisible, setIsEpisodesVisible] = useState(true);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    setEpisodeNumber(-1);
  }, [activeAnime, modal]);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      setModal(false);
    };

    if (modal) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handleBackButton);
    } else {
      window.removeEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [modal, setModal]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handlePlay = () => console.log("Oynatıldı.");
      const handlePause = () => setIsEpisodesVisible(true);

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.id === "modal-background") {
      setModal(false);
    }
  };

  const handleEpisodeInputChange = (e) => {
    setEpisodeNumber(Number(e.target.value));
  };

  const handleEpisodeSelect = () => {
    const episodeElement = document.getElementById(`episode-${episodeNumber}`);
    if (episodeElement) {
      episodeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const toggleEpisodesPane = () => {
    setIsEpisodesVisible((prev) => !prev);
  };

  const handlePreviousEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, activeAnime.episodes.length - 1);
      setEpisodeNumber(activeAnime.episodes[newIndex]?.episode_number || -1);
      return newIndex;
    });
  };

  const handleNextEpisode = () => {

    setCurrentEpisodeIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      setEpisodeNumber(activeAnime.episodes[newIndex]?.episode_number || -1);
      return newIndex;
    });
    
  };

  const episodeIndex = episodeNumber !== -1
    ? activeAnime.episodes.findIndex((episode) => episode.episode_number === episodeNumber)
    : currentEpisodeIndex;

  if (!modal) return null;

  return (
    <div
      id="modal-background"
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black lg:!text-sm sm:text-xs"
    >
      <div className="relative w-[90%] h-[85vh] flex bg-black bg-opacity-75 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <iframe
            ref={videoRef}
            className="w-full h-full rounded-lg"
            title="video-player"
            src={activeAnime.episodes[episodeIndex]?.watch_link_1?.includes("https")
              ? activeAnime.episodes[episodeIndex]?.watch_link_1?.slice(6)
              : activeAnime.episodes[episodeIndex]?.watch_link_1}
            allowFullScreen
          ></iframe>
          <button
            onClick={toggleEpisodesPane}
            className={`absolute xs:text-xs top-10 right-4 hover:opacity-100 transition-all z-10 p-2 bg-red-500 text-white rounded-lg shadow-md ${
              isEpisodesVisible ? "opacity-100" : "opacity-50"
            } transition-opacity duration-300`}
          >
            {isEpisodesVisible ? "Bölümleri Gizle" : "Bölümleri Göster"}
          </button>
        </div>

        <div
          className={`absolute right-0 top-[10%] h-4/6 bg-transparent overflow-y-auto p-4 transform ${
            isEpisodesVisible ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500`}
        >
          <div
            className={`opacity-100 transition-opacity duration-500 ${
              isEpisodesVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex justify-center items-center mb-4">
              <input
                type="number"
                value={episodeNumber !== -1 ? episodeNumber : activeAnime.activeEpisodeNumber}
                onChange={handleEpisodeInputChange}
                className="w-4/6 text-black p-2 rounded-l-md border border-gray-600"
                placeholder="Bölüm"
              />
              <button
                onClick={handleEpisodeSelect}
                className="p-2 bg-red-500 w-2/6 text-white rounded-r-md hover:bg-red-600 transition-colors duration-300"
              >
                Git
              </button>
            </div>
            <ul className="space-y-6">
              {activeAnime.episodes.map((episode, index) => (
                <li
                  key={episode.episode_number}
                  id={`episode-${episode.episode_number}`}
                  onClick={() => {
                    setEpisodeNumber(episode.episode_number);
                    setCurrentEpisodeIndex(index);
                  }}
                  className={`bg-gradient-to-r from-gray-700 opacity-40 border-2 border-gray-800 hover:opacity-100 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer ${
                    index === currentEpisodeIndex ? "bg-gray-600" : ""
                  } ${
                    episodeNumber >= 0 ? episodeNumber === episode.episode_number ? "border-2 !border-green-300" : "" : activeAnime.activeEpisodeNumber  === episode.episode_number ? "border-2 !border-green-300" : ""
                  }`}
                >
                  <div className="flex items-center p-4 space-x-6">
                    <img
                      src={activeAnime.second_image}
                      alt={`Episode ${episode.episode_number}`}
                      className="w-20 h-20 lg:w-10 lg:h-10 md:h-8 md:w-8 sm:w-5 sm:h-5 xs:w-5 xs:h-5 rounded-full border-4 border-gray-600 shadow-md transition-transform duration-300 transform hover:scale-110"
                    />
                    <div className="text-white">
                      <p className="text-2xl lg:text-sm sm:text-sm xs:text-xs md:text-sm font-bold mb-1">
                        {episode.episode_number}.Bölüm
                      </p>
                      <p className="text-sm text-gray-300">Bu bölümün özeti...</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute bottom-[8%] right-0 w-2/12 flex justify-end space-x-2 bg-transparent ">
          <button
            onClick={handlePreviousEpisode}
            className="p-4 flex items-center justify-center bg-black text-white text-sm xs:text-xs xs:p-2 shadow-lg opacity-50 hover:opacity-90 transition-all duration-300 hover:bg-gray-800"
          >
            Önceki Bölüm
          </button>
          <button
            onClick={handleNextEpisode}
            className="p-4 flex items-center justify-center bg-black text-white text-sm xs:text-xs xs:p-2 shadow-lg opacity-50 hover:opacity-90 hover:bg-gray-800 transition-all duration-300"
          >
            Sonraki Bölüm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
