import React, { useEffect, useState } from 'react';
import AddAnimeForm from './AddAnimeForm';
import AddEpisodeForm from './AddEpisodeForm';
import UpdateAnimeForm from './UpdateAnimeForm';
import UpdateEpisodeForm from './UpdateEpisodeForm';

const MainForm = () => {

  const [activeForm, setActiveForm] = useState('addAnime');

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
     
      {/* Form Konteyneri */}
      <div className="relative w-1/3 h-[95%] bg-gray-800 rounded-md shadow-lg p-6 flex flex-col overflow-hidden">
        
        {/* Form Geçiş Butonları */}
        <div className="flex justify-around mb-4">
          <button
            onClick={() => setActiveForm('addAnime')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Anime
          </button>
          <button
            onClick={() => setActiveForm('addEpisode')}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add Episode
          </button>
          <button
            onClick={() => setActiveForm('updateAnime')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Update Anime
          </button>
          <button
            onClick={() => setActiveForm('updateEpisode')}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Update Episode
          </button>
        </div>

        {/* Formlar */}
        <div className="relative flex flex-col h-full w-full">
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${activeForm === 'addAnime' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <AddAnimeForm />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${activeForm === 'addEpisode' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <AddEpisodeForm />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${activeForm === 'updateAnime' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <UpdateAnimeForm />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${activeForm === 'updateEpisode' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <UpdateEpisodeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
