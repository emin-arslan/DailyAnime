import React, { useState } from 'react';
import naruto from "../assets/naruto.jpg"; // .jpg uzantısı ile resim
import naruto2 from "../assets/naruto2.jpg"; // .jpg uzantısı ile diğer resim

const AnimeInfo = () => {
  const [isHovered, setIsHovered] = useState(false);

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
      { title: "Episode 1", description: "Description of episode 1" },
      { title: "Episode 2", description: "Description of episode 2" },
      { title: "Episode 3", description: "Description of episode 3" },
      { title: "Episode 4", description: "Description of episode 4" },
      { title: "Episode 5", description: "Description of episode 5" },
      { title: "Episode 6", description: "Description of episode 6" },
      { title: "Episode 1", description: "Description of episode 1" },
      { title: "Episode 2", description: "Description of episode 2" },
      { title: "Episode 3", description: "Description of episode 3" },
      { title: "Episode 4", description: "Description of episode 4" },
      { title: "Episode 5", description: "Description of episode 5" },
      { title: "Episode 6", description: "Description of episode 6" },
      // Daha fazla bölüm ekleyebilirsiniz
    ]
  };

  return (
    <div className="sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-8/12 mx-auto mt-12 w-2/4">
      <div 
        className="relative bg-gray-900 text-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Büyük Arka Plan Resmi */}
        <div className="relative w-full h-96">
          <img 
            src={anime.largeImage} 
            alt="Anime Background" 
            className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-100'}`} 
          />
          {/* Oynat Butonu */}
          <button
            className={`absolute flex items-center justify-center rounded-full shadow-lg transition-transform duration-500 ${isHovered ? 'opacity-100 scale-110 cursor-pointer' : 'opacity-0 scale-100'}`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            aria-label="Play"
          >
            <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-lg">
              <div className="absolute inset-0 bg-black opacity-30 rounded-full transition-opacity duration-300 group-hover:opacity-70"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3L19 12L5 21V3Z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Küçük Resim ve Bilgiler */}
        <div className="absolute inset-x-0 bottom-0 p-6 rounded-t-lg relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent opacity-80 rounded-t-lg" />
          <div className="relative">
            <div className="flex items-end">
              <div className="relative">
                <img
                  src={anime.smallImage}
                  alt="Anime Thumbnail"
                  className="w-32 h-32 object-cover rounded-lg border-4 border-gray-600 shadow-md"
                />
              </div>
              <div className="ml-6">
                <h1 className="text-4xl font-bold text-gray-100">{anime.title}</h1>
                <p className="mt-2 text-lg">{anime.description}</p>
                <p className="mt-2 text-sm text-gray-400">Episodes: {anime.episodeCount}</p>
                <p className="text-sm text-gray-400">Released: {anime.releasedCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bölümler */}
      <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-md max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">Episodes</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
          {anime.episodes.map((episode, index) => (
            <div key={index} className="relative bg-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600">
              <div className="absolute top-0 right-0 bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-bl-lg">
                {index + 1}
              </div>
              <h3 className="text-sm font-semibold text-gray-100">{episode.title}</h3>
              <p className="text-gray-300 mt-1">{episode.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
