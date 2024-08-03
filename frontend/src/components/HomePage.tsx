import React from 'react';// Arayüzlerin tanımlandığı dosyayı import edin
import { Anime, PlayerInterface } from '../types/Anime';
import Star from './Star';

interface HomePageProps {
  homePageAnimes: Anime[],
  setActiveAnime: (arg1:PlayerInterface) => void,
  setModal: (arg1:boolean) => void;
}


const HomePage: React.FC<HomePageProps> = ({ homePageAnimes, setActiveAnime, setModal }) => {

  const startAnimePlayer = (anime: Anime) => {
    setActiveAnime({...anime, activeEpisodeNumber:anime.episodes[0].episode_number });
    setModal(true);
};

  const handleWaitForDatas = () => {
    const placeholderItems = Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="bg-gray-800 ring-1 ring-gray-700 rounded-lg shadow-lg h-72 max-w-[220px] w-[220px]">
        <div className="flex h-full animate-pulse relative justify-start items-end rounded-xl">
          <div className='absolute right-0 w-20 h-6 from-gray-500 rounded-b-sm to-gray-300 bg-gradient-to-b top-0 rounded-tr-xl'></div>
          <div className='absolute left-0 w-8 h-8 rounded-full bg-gray-400 top-0 ml-1 mt-1'></div>
          <div className='h-20 bg-gray-400 rounded-b-xl flex flex-col p-2 w-[220px]'>
            <div className='w-24 bg-gray-500 h-4 rounded-md mt-4'></div>
            <div className='justify-between items-end h-8 flex'>
              <div className='w-20 h-4 bg-gray-800/30 rounded-md'></div>
              <div className='w-20 h-4 bg-gray-800/30 rounded-md'></div>
            </div>
          </div>
        </div>
      </div>
    ));
    return <div className="grid grid-cols-6 gap-4 mt-5 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 min-w-[220px] w-auto place-content-center">{placeholderItems}</div>;
  };

  return (
    <div className="w-full relative transition-all bg-gray-900 h-full py-5 px-4 cursor-pointer xs:px-0">
      {homePageAnimes.length > 0 ? (
        <div className="grid grid-cols-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 xs:gap-2 ">
          {homePageAnimes.map((anime) => (
            <div key={anime.id} className="relative group">
              <img
                alt={anime.name}
                src={anime.second_image}
                className="w-full h-72 object-cover rounded-xl transition duration-500 ease-in-out transform group-hover:scale-105"
              />
              <div
                onClick={() => startAnimePlayer(anime)}
                className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-xl transition duration-500 ease-in-out opacity-0 group-hover:opacity-100"
              >
                <p className="text-lg font-bold truncate text-white">{anime.name}</p>
                <p className="text-sm text-gray-300">{`Episodes: ${anime.episodes[0].episode_number}`}</p>
                <div className="flex justify-between items-center pt-2">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(anime.name, '_blank');
                    }}
                    className="bg-blue-500 text-xs hover:cursor-pointer rounded-full px-2 py-1 opacity-90 text-white"
                  >
                    
                    {anime.name}
                  </span>
                  <Star />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : handleWaitForDatas()}
    </div>
  );
};

export default HomePage;
