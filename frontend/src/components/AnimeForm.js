import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAnimeAction,
  addNewEpisodeRequest,
  getAnimeEpisodesByIdAction,
  getAnimeInfosAction,
} from "./redux/actions/action";
import ComboBox from "../utils/Combobox";
import { getAnimeInfosSelector, getEpisodesInfosById } from "./redux/selector";

const AnimeForm = () => {
  const dispatch = useDispatch();
  const [showAddEpisodeForm, setShowAddEpisodeForm] = useState(true);
  const [categories, setCategories] = useState([]);
  const animeInfos = useSelector(getAnimeInfosSelector);
  const episodeInfosById = useSelector(getEpisodesInfosById);
  const episodeNames = animeInfos?.map((anime) => anime.NAME); // Example options

  const [allCategories] = useState([
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Supernatural",
    "Thriller",
    "Shounen",
    "Seinen",
    "Shoujo",
    "Ecchi",
    "Harem",
    "isekai",
    "Sport",
  ]);

  useEffect(() => {
    dispatch(getAnimeInfosAction());
  }, [dispatch]);

  const [animeData, setAnimeData] = useState({
    NAME: "",
    DESCRIPTION: "",
    TOTAL_EPISODES: "",
    FIRST_IMAGE: "",
    SECOND_IMAGE: "",
    CATEGORIES: [],
  });

  const [episodeData, setEpisodeData] = useState({
    ANIME_ID: "",
    WATCH_LINK_1: "",
    WATCH_LINK_2: "",
    WATCH_LINK_3: "",
    EPISODE_NUMBER: "",
  });

  const [episodeInput, setEpisodeInput] = useState(1);

  useEffect(() => {
    if (animeInfos && episodeData.ANIME_ID) {
      const selectedAnime = animeInfos.find(
        (anime) => anime._id === episodeData.ANIME_ID
      );
      console.log(selectedAnime, "selected");
      if (selectedAnime) {
        dispatch(getAnimeEpisodesByIdAction(selectedAnime._id));
        console.log("dispatch altı", episodeInfosById);
      } else {
        setEpisodeInput(1);
      }
    }
  }, [episodeData.ANIME_ID, animeInfos, dispatch]);

  useEffect(()=>{
    setEpisodeData({
      ...episodeData,
      EPISODE_NUMBER: episodeInput
    })
  },[setEpisodeInput])

  useEffect(() => {
    if (episodeInfosById.length > 0) {
      const latestEpisode = episodeInfosById.reduce((prev, current) =>
        prev.EPISODE_NUMBER > current.EPISODE_NUMBER ? prev : current
      );
      setEpisodeInput(latestEpisode.EPISODE_NUMBER + 1);
    } else {
      setEpisodeInput(1);
    }
  }, [episodeInfosById]);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const newCategories = selectedOptions.filter(
      (option) => !categories.includes(option)
    );
    setCategories([...categories, ...newCategories]);
    setAnimeData((prevData) => ({
      ...prevData,
      CATEGORIES: [...categories, ...newCategories],
    }));
  };

  const handleCategoryRemove = (category) => {
    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
    setAnimeData((prevData) => ({
      ...prevData,
      CATEGORIES: updatedCategories,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAnimeAction(animeData));
  };

  const handleAddNewAnime = (e) => {
    e.preventDefault();
    dispatch(addNewEpisodeRequest({...episodeData, EPISODE_NUMBER: episodeInput}));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Anime Formları</h2>
        <div className="flex justify-center mb-4 space-x-2 ">
          <button
            onClick={() => setShowAddEpisodeForm(true)}
            className={`px-4 py-2 ${
              showAddEpisodeForm
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600"
            } font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300`}
          >
            Anime Bölüm Ekleme
          </button>
          <button
            onClick={() => setShowAddEpisodeForm(false)}
            className={`px-4 py-2 ${
              !showAddEpisodeForm
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600"
            } font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300`}
          >
            Anime Oluşturma
          </button>
        </div>
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-in-out max-h-screen ${
            showAddEpisodeForm ? "min-h-[600px]" : "min-h-[800px]"
          }`}
        >
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              showAddEpisodeForm ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col justify-start p-4 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Anime Bölüm Ekleme</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime İsmi
                  </label>
                  <ComboBox
                    options={animeInfos}
                    onChange={(option) =>
                      setEpisodeData({
                        ...episodeData,
                        ANIME_ID: option._id,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime Bölüm Video URL'si 1
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={episodeData.WATCH_LINK_1}
                    onChange={(e) => {
                      setEpisodeData({
                        ...episodeData,
                        WATCH_LINK_1: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime Bölüm Video URL'si 2
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={episodeData.WATCH_LINK_2}
                    onChange={(e) => {
                      setEpisodeData({
                        ...episodeData,
                        WATCH_LINK_2: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime Bölüm Video URL'si 3
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={episodeData.WATCH_LINK_3}
                    onChange={(e) => {
                      setEpisodeData({
                        ...episodeData,
                        WATCH_LINK_3: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kaçıncı Bölüm
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={episodeInput}
                    onChange={(e) =>
                      setEpisodeInput(e.target.value)
                    }
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleAddNewAnime}
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Ekle
                </button>
              </form>
            </div>
          </div>
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              !showAddEpisodeForm ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col justify-start p-4 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Anime Oluşturma</h3>
              <form onSubmit={handleOnSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime İsmi
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={animeData.NAME}
                    onChange={(e) =>
                      setAnimeData({
                        ...animeData,
                        NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime Kapak Fotoğrafı SRC URL'si
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={animeData.FIRST_IMAGE}
                    onChange={(e) =>
                      setAnimeData({
                        ...animeData,
                        FIRST_IMAGE: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime Küçük Fotoğrafı SRC URL'si
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={animeData.SECOND_IMAGE}
                    onChange={(e) =>
                      setAnimeData({
                        ...animeData,
                        SECOND_IMAGE: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Anime Açıklaması
                  </label>
                  <textarea
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={animeData.DESCRIPTION}
                    onChange={(e) =>
                      setAnimeData({
                        ...animeData,
                        DESCRIPTION: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Toplam Bölüm Sayısı
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={animeData.TOTAL_EPISODES}
                    onChange={(e) =>
                      setAnimeData({
                        ...animeData,
                        TOTAL_EPISODES: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kategoriler
                  </label>
                  <div className="mt-1 flex flex-wrap space-x-2">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-md shadow-sm mb-2"
                      >
                        {category}
                        <button
                          type="button"
                          onClick={() => handleCategoryRemove(category)}
                          className="ml-1 text-white"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <select
                    multiple
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={animeData.CATEGORIES}
                    onChange={handleCategoryChange}
                  >
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Oluştur
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeForm;
