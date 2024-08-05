  import React, { useEffect, useState, useRef } from "react";

  const Player = ({ modal, activeAnime, setModal }) => {
    console.log(activeAnime);
    const [episodeNumber, setEpisodeNumber] = useState(-1);
    const [isEpisodesVisible, setIsEpisodesVisible] = useState(true);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [selectedLink, setSelectedLink] = useState("");
    const [episodeLinks, setEpisodeLinks] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (!modal) {
        setEpisodeNumber(-1);
        if (videoRef.current) {
          videoRef.current.src = ""; // Stop the video when modal closes
        }
        setSelectedLink("");
      } else if (modal) {
        setCurrentEpisodeIndex(0)
        setEpisodeNumber(activeAnime.activeEpisodeNumber);
      }
    }, [modal]);

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

    useEffect(() => {
      const episodeIndex =
        episodeNumber !== -1
          ? activeAnime.episodes?.findIndex(
              (episode) => episode.episode_number === episodeNumber
            )
          : currentEpisodeIndex;

      const links = [
        activeAnime.episodes?.[episodeIndex]?.watch_link_1,
        activeAnime.episodes?.[episodeIndex]?.watch_link_2,
        activeAnime.episodes?.[episodeIndex]?.watch_link_3,
      ].filter((link) => link);

      setEpisodeLinks(links);
      setSelectedLink(links.length > 0 ? links[0] : "");
    }, [episodeNumber, currentEpisodeIndex, activeAnime]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.src = selectedLink;
      }
      else if(modal)
      {
        if(videoRef.current)
        {
          videoRef.current.src = activeAnime.episodes[activeAnime.activeEpisode]?.watch_link_1;
        }
      }
    }, [selectedLink,modal]);

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

    const handleNextEpisode = () => {
      setCurrentEpisodeIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        setEpisodeNumber(activeAnime.episodes?.[newIndex]?.episode_number || -1);
        return newIndex;
      });
    };

    const handlePreviousEpisode = () => {
      setCurrentEpisodeIndex((prevIndex) => {
        const newIndex = Math.min(
          prevIndex + 1,
          activeAnime.episodes?.length - 1 || 0
        );
        setEpisodeNumber(activeAnime.episodes?.[newIndex]?.episode_number || -1);
        return newIndex;
      });
    };

    if (!modal) return null;

    return (
      <div
        id="modal-background"
        onClick={handleClickOutside}
        className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black"
      >
        <div className="relative w-full max-w-screen-lg h-[85vh] flex bg-black bg-opacity-75 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <iframe
              ref={videoRef}
              className="w-full h-full rounded-lg"
              title="video-player"
              allowFullScreen
              onError={() => {
                if (videoRef.current) {
                  videoRef.current.innerHTML = `
                    <div class="flex items-center justify-center w-full h-full text-white">
                      Görünüşe göre video sorun var. Lütfen başka player seçin. Sorunu çözebilmemiz için lütfen bize bildirin.
                    </div>
                  `;
                }
              }}
            ></iframe>
          </div>
          <div
            className={`absolute top-0 right-0 h-full bg-gray-900 bg-opacity-75 shadow-lg transform transition-transform duration-500 ${
              isEpisodesVisible ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ width: "300px" }}
          >
            <button
              onClick={toggleEpisodesPane}
              className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:opacity-100 hover:bg-gray-600 transition-all duration-300"
            >
              {isEpisodesVisible ? (
                <span className="transform rotate-180">{'>'}</span>
              ) : (
                <span>{'<'}</span>
              )}
            </button>
            <div className="p-4 flex flex-col space-y-4 h-full overflow-y-auto">
              <div
                className="text-white text-lg font-bold mb-4 truncate"
                title={activeAnime.name}
              >
                {activeAnime.name}
              </div>
              <div className="text-white text-sm mb-2">Lütfen bir player seçin:</div>
              <select
                onChange={(e) => setSelectedLink(e.target.value)}
                value={selectedLink}
                className="bg-gray-800 bg-opacity-50 border border-gray-600 text-white text-xs rounded-lg shadow-md focus:outline-none focus:ring-2 p-2 appearance-none"
              >
                <option value="" disabled>
                  Player Seç
                </option>
                {episodeLinks.map((link, index) => (
                  <option key={index} value={link}>
                    Player {index + 1}
                  </option>
                ))}
              </select>
              <div className="text-white text-sm mt-4 mb-2">
                Bölüm numarasını girin ve "Git" butonuna tıklayarak hızlıca o bölüme geçebilirsiniz.
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  value={
                    episodeNumber !== -1
                      ? episodeNumber
                      : activeAnime.activeEpisodeNumber
                  }
                  onChange={handleEpisodeInputChange}
                  className="w-full text-black p-2 rounded-lg border border-gray-600 bg-opacity-50"
                  placeholder="Bölüm"
                />
                <button
                  onClick={handleEpisodeSelect}
                  className="bg-gray-800 bg-opacity-50 text-white text-xs rounded-lg shadow-md p-2 hover:opacity-100 hover:bg-gray-600 transition-all duration-300"
                >
                  Git
                </button>
              </div>
              <ul className="flex flex-col space-y-2 overflow-y-auto h-48">
                {activeAnime.episodes?.map((episode, index) => (
                  <li
                    key={episode.episode_number}
                    id={`episode-${episode.episode_number}`}
                    onClick={() => {
                      setEpisodeNumber(episode.episode_number);
                      setCurrentEpisodeIndex(index);
                    }}
                    className={`bg-gray-800 bg-opacity-50 text-white text-xs rounded-lg shadow-md p-2 hover:opacity-100 hover:bg-gray-600 transition-all duration-300 cursor-pointer ${
                      index === currentEpisodeIndex ? "bg-gray-600" : ""
                    } ${
                      episodeNumber >= 0
                        ? episodeNumber === episode.episode_number
                          ? "border-2 !border-green-300"
                          : ""
                        : activeAnime.activeEpisodeNumber ===
                          episode.episode_number
                        ? "border-2 !border-green-300"
                        : ""
                    }`}
                  >
                    {episode.episode_number}. Bölüm
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-2 mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={handlePreviousEpisode}
                    className="flex-1 p-2 bg-gray-800 bg-opacity-50 text-white text-xs rounded-lg shadow-md hover:opacity-100 hover:bg-gray-600 transition-all duration-300"
                  >
                    Önceki Bölüm
                  </button>
                  <button
                    onClick={handleNextEpisode}
                    className="flex-1 p-2 bg-gray-800 bg-opacity-50 text-white text-xs rounded-lg shadow-md hover:opacity-100 hover:bg-gray-600 transition-all duration-300"
                  >
                    Sonraki Bölüm
                  </button>
                </div>
                {activeAnime.categories.length > 0 && (
                  <div className="text-white text-sm mt-4">
                    <div className="font-bold mb-2">Kategoriler:</div>
                    <ul className="list-disc pl-4 text-xs">
                      {activeAnime.categories.map((category, index) => (
                        <li key={index}>{category}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowReport(true)}
            className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-all duration-300 z-60"
          >
            Bildir
          </button>
          {showReport && (
            <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-md z-70">
              <div className="font-bold mb-2">Sorun Bildirimi</div>
              <p>
                Görünüşe göre video sorun var. Lütfen başka player seçin. Sorunu çözebilmemiz için lütfen bize bildirin.
              </p>
              <button
                onClick={() => setShowReport(false)}
                className="mt-2 bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default Player;
