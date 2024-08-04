import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewEpisodeRequest } from "./redux/actions/action";

const EpisodeForm = ({ initialEpisodeData }) => {
  const dispatch = useDispatch();
  const [episodeData, setEpisodeData] = useState(initialEpisodeData);
  const [episodeInput, setEpisodeInput] = useState(1);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //dispatch(addNewEpisodeRequest({ ...episodeData, EPISODE_NUMBER: episodeInput }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-5">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Bölüm Ekleme</h2>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div>
            <label htmlFor="animeSelect" className="block text-sm font-medium text-gray-300">
              Anime İsmi
            </label>
            <input
              type="text"
              id="animeSelect"
              value={episodeData.ANIME_ID}
              onChange={(e) => setEpisodeData({ ...episodeData, ANIME_ID: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="watchLink1" className="block text-sm font-medium text-gray-300">
              Anime Bölüm Video URL'si 1
            </label>
            <input
              type="text"
              id="watchLink1"
              value={episodeData.WATCH_LINK_1}
              onChange={(e) => setEpisodeData({ ...episodeData, WATCH_LINK_1: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="watchLink2" className="block text-sm font-medium text-gray-300">
              Anime Bölüm Video URL'si 2
            </label>
            <input
              type="text"
              id="watchLink2"
              value={episodeData.WATCH_LINK_2}
              onChange={(e) => setEpisodeData({ ...episodeData, WATCH_LINK_2: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="watchLink3" className="block text-sm font-medium text-gray-300">
              Anime Bölüm Video URL'si 3
            </label>
            <input
              type="text"
              id="watchLink3"
              value={episodeData.WATCH_LINK_3}
              onChange={(e) => setEpisodeData({ ...episodeData, WATCH_LINK_3: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="episodeNumber" className="block text-sm font-medium text-gray-300">
              Kaçıncı Bölüm
            </label>
            <input
              type="number"
              id="episodeNumber"
              value={episodeInput}
              onChange={(e) => setEpisodeInput(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

EpisodeForm.defaultProps = {
  initialEpisodeData: {
    ANIME_ID: '',
    WATCH_LINK_1: '',
    WATCH_LINK_2: '',
    WATCH_LINK_3: '',
    EPISODE_NUMBER: 1,
  },
};

export default EpisodeForm;
