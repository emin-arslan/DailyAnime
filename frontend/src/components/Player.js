import React, { useEffect, useState, useRef } from "react";

const Player = (props) => {
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [isEpisodesVisible, setIsEpisodesVisible] = useState(true);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      props.setModal(false);
    };

    if (props.modal) {
      window.history.pushState(null, null, window.location.href);
      window.addEventListener("popstate", handleBackButton);
    } else {
      window.removeEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [props, props.modal]);

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
      props.setModal(false);
    }
  };

  const handleEpisodeInputChange = (e) => {
    setEpisodeNumber(e.target.value);
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
    setCurrentEpisodeIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => Math.min(prevIndex + 1, episodeList.length - 1));
  };

  const episodeList = [
    "Bölüm 1",
    "Bölüm 2",
    "Bölüm 3",
    "Bölüm 4",
    "Bölüm 5",
    "Bölüm 6",
    "Bölüm 7",
    "Bölüm 8",
    "Bölüm 9",
    "Bölüm 10",
    "Bölüm 93",
  ];

  if (!props.modal) return null;

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
            src={
              props.video?.includes("https")
                ? props.video.slice(6)
                : props.video
            }
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
                value={episodeNumber}
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
              {episodeList.map((episode, index) => (
                <li
                  id={`episode-${index + 1}`}
                  key={index}
                  className={`bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer ${
                    index === currentEpisodeIndex ? "bg-gray-600" : ""
                  }`}
                >
                  <div className="flex items-center p-4 space-x-6">
                    <img
                      src={`https://via.placeholder.com/100x100?text=EP${
                        index + 1
                      }`}
                      alt={`Episode ${index + 1}`}
                      className="w-20 h-20 lg:w-10 lg:h-10 md:h-8 md:w-8 sm:w-5 sm:h-5 xs:w-5 xs:h-5 rounded-full border-4 border-gray-600 shadow-md transition-transform duration-300 transform hover:scale-110"
                    />
                    <div className="text-white">
                      <p className="text-2xl lg:text-sm sm:text-sm xs:text-xs md:text-sm font-bold mb-1">{episode}</p>
                      <p className="text-sm text-gray-300">
                        Bu bölümün özeti...
                      </p>
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
            className="p-4 flex items-center justify-center bg-black text-white text-sm xs:text-xs xs:p-2  shadow-lg opacity-50 hover:opacity-90 transition-all duration-300 hover:bg-gray-800 "
          >
            Önceki Bölüm
          </button>
          <button
            onClick={handleNextEpisode}
            className="p-4 flex items-center justify-center bg-black text-white text-sm  xs:text-xs xs:p-2 shadow-lg opacity-50 hover:opacity-90 hover:bg-gray-800 transition-all duration-300"
          >
            Sonraki Bölüm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
