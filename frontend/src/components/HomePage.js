import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from './Star';

const HomePage = ({ homePageAnimes, setActiveAnime, setModal }) => {
  const [visibleAnimes, setVisibleAnimes] = useState(15);
  const navigate = useNavigate();

  const startAnimePlayer = (anime) => {
    setActiveAnime({ ...anime, activeEpisodeNumber: anime.episodes[0].episode_number });
    setModal(true);
  };

  const handleWaitForDatas = () => {
    const placeholderItems = Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="ring-1 ring-[#252525] rounded-lg shadow-lg h-72 max-w-[220px] w-[220px]">
        <div className="flex h-full animate-pulse relative justify-start items-end rounded-xl">
          <div className='absolute right-0 w-20 h-6 bg-[#252525] rounded-b-sm to-gray-300 bg-gradient-to-b top-0 rounded-tr-xl'></div>
          <div className='absolute left-0 w-8 h-8 rounded-full bg-[#252525] top-0 ml-1 mt-1'></div>
          <div className='h-20 bg-[#252525] rounded-b-xl flex flex-col p-2 w-[220px]'>
            <div className='w-24 bg-[#252525] h-4 rounded-md mt-4'></div>
            <div className='justify-between items-end h-8 flex'>
              <div className='w-20 h-4 bg-gray-800/30 rounded-md'></div>
              <div className='w-20 h-4 bg-gray-800/30 rounded-md'></div>
            </div>
          </div>
        </div>
      </div>
    ));
    return <div className='h-screen'><div className="grid grid-cols-5 gap-x-34 p-5 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 min-w-[220px] w-auto place-content-center">{placeholderItems}</div></div>;
  };

  const handleAnimeInfo = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/animeInfo/name?query=${encodedName}`);
  };

  const handleMobileAnimeWatch = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/mobile-anime/name?query=${encodedName}`);
  };

  const handleShowMore = () => {
    setVisibleAnimes((prevVisible) => prevVisible + 15);
  };

  return (
    <div className="w-full relative transition-all h-full py-5 px-4  xs:px-0">
      {homePageAnimes.length > 0 ? (
        <>
          <div className="grid grid-cols-6 xs:grid-cols-3 sm:grid-cols-3 xl:grid-cols-4  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 xs:p-4">
            {homePageAnimes.slice(0, visibleAnimes).map((anime) => (
              <div key={anime.id} className="relative group">
                <img
                  alt={anime.name}
                  src={anime.first_image}
                  className="w-full h-72 xs:h-32 sm:h-32 md:h-60 object-cover rounded-xl transition duration-500 ease-in-out transform group-hover:scale-105"
                />
                <div
                  onClick={() => startAnimePlayer(anime)}
                  className="absolute inset-0 flex xs:hidden sm:hidden flex-col justify-end p-4 bg-black bg-opacity-50 rounded-xl transition duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                >
                  <p className="text-lg font-bold truncate text-white">{anime.name}</p>
                  <p className="text-sm text-gray-300">{`Episodes: ${anime.episodes[0].episode_number}`}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // Bu butonun tıklama olayının üst öğelere yayılmasını engeller
                        handleAnimeInfo(anime.name);
                      }}
                      className="bg-blue-500 text-xs hover:cursor-pointer rounded-full px-2 py-1 opacity-90 text-white"
                    >
                      Animeye Git
                    </span>
                    <Star />
                  </div>
                </div>
              <div onClick={handleMobileAnimeWatch} className='w-full h-full bg-transparent hidden xs:flex sm:flex top-0 absolute '> 
              <div className='hidden xs:flex sm:flex absolute h-5 bottom-0 bg-black w-full opacity-70 items-center text-white transform group-hover:scale-105 rounded-b-lg text-[10px] transition duration-500 ease-in-out'>
                <div className='flex justify-between w-full p-1'>
                  <div className='flex-1 truncate'>
                    {anime.name.slice(0, 15)}
                  </div>
                  <div className='flex-none'>
                    {anime.episodes.length}
                  </div>
                </div>
              </div>
              </div>
              </div>
            ))}
          </div>
          {visibleAnimes < homePageAnimes.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-[#252525] hover:bg-[#282828] text-white font-bold py-2 px-4 rounded"
              >
                Daha Fazla Göster
              </button>
            </div>
          )}
        </>
      ) : (
        handleWaitForDatas()
      )}
    </div>
  );
};

export default HomePage;
