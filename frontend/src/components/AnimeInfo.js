import React, { useState, useRef } from 'react';
import naruto from "../assets/naruto.jpg"; // Büyük arka plan resmi
import naruto2 from "../assets/naruto2.jpg"; // Küçük resim

const AnimeInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const anime = {
    title: "Naruto",
    description: "Naruto description goes here. This description can be longer and provide more details about the anime.",
    episodeCount: 24,
    releasedCount: 20,
    largeImage: naruto, // Büyük arka plan resmi
    smallImage: naruto2, // Küçük resim
    episodes: [
      { title: "Episode 1", description: "Description of episode 1" },
      { title: "Episode 2", description: "Description of episode 2" },
      { title: "Episode 3", description: "Description of episode 3" },
      { title: "Episode 4", description: "Description of episode 4" },
      { title: "Episode 5", description: "Description of episode 5" },
      { title: "Episode 6", description: "Description of episode 6" },
      { title: "Episode 7", description: "Description of episode 7" },
      { title: "Episode 8", description: "Description of episode 8" },
      { title: "Episode 9", description: "Description of episode 9" },
      { title: "Episode 10", description: "Description of episode 10" },
      { title: "Episode 11", description: "Description of episode 11" },
      { title: "Episode 12", description: "Description of episode 12" },
      { title: "Episode 13", description: "Description of episode 13" },
      { title: "Episode 14", description: "Description of episode 14" },
      { title: "Episode 15", description: "Description of episode 15" },
    ]
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -600 : 600,
        behavior: 'smooth'
      });
    }
  };

  const handleWheel = (e) => {
    if (scrollRef.current) {
      // Katsayıyı ayarlayın, buradaki 2.0 değeri kaydırma hızını artırır.
      const scrollAmount = e.deltaY * 2.0; 
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full lg:w-3/4 xl:w-3/4 mx-auto">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-gray-900 text-gray-200 overflow-hidden shadow-lg"
      >
        {/* Büyük Arka Plan Resmi */}
        <img 
          src={anime.largeImage} 
          alt="Anime Background" 
          className={`w-full h-96 object-cover transition-opacity duration-300 ${isHovered ? 'opacity-60' : 'opacity-100'}`}
        />

        {/* Oynat Butonu */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <button
            className="bg-gradient-to-br from-red-600 to-red-500 p-6 rounded-full shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-125"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3L19 12L5 21V3Z" />
            </svg>
          </button>
        </div>

        {/* Küçük Resim ve Bilgiler */}
        <div className="absolute inset-x-0 bottom-0 p-6 rounded-t-lg relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-80 rounded-t-lg" />
          <div className="relative flex items-end">
            <img
              src={anime.smallImage}
              alt="Anime Thumbnail"
              className="w-32 h-32 object-cover rounded-lg border-4 border-gray-600 shadow-md"
            />
            <div className="ml-6">
              <h1 className="text-4xl font-bold text-gray-100">{anime.title}</h1>
              <p className="mt-2 text-lg">{anime.description}</p>
              <p className="mt-2 text-sm text-gray-400">Episodes: {anime.episodeCount}</p>
              <p className="text-sm text-gray-400">Released: {anime.releasedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bölümler */}
      <div className="relative bg-gray-900 p-6 mt-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">Episodes</h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600"
            onWheel={handleWheel}
          >
            {anime.episodes.map((episode, index) => (
              <div key={index} className="relative select-none cursor-pointer bg-gray-800 p-4 rounded-lg shadow-lg flex-shrink-0 min-w-64 transition-transform transform hover:scale-105 hover:bg-gray-700">
                <div className="absolute top-0 right-0 bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-bl-lg">
                  {index + 1}
                </div>
                <div className="w-full h-32 bg-gray-600 rounded-lg mb-2 flex items-center justify-center">
                  <img src={naruto2} alt="Episode Thumbnail" className="w-full h-full object-cover rounded-lg"/>
                </div>
                <h3 className="text-lg font-semibold text-gray-100">{episode.title}</h3>
                <p className="text-gray-300 mt-1">{episode.description}</p>
              </div>
            ))}
          </div>
          {/* Slider Navigation Buttons */}
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
            onClick={() => handleScroll('left')}
            style={{ zIndex: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
            onClick={() => handleScroll('right')}
            style={{ zIndex: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
