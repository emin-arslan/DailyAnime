import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAnimes } from './redux/selector';
import { addNewAnimeRequestAction } from './redux/actions/action';

const AddAnimeForm = () => {
  const dispatch = useDispatch();
  const animes = useSelector(getAnimes);

  const animeOptions = animes.map(anime => ({
    value: anime.NAME,
    label: anime.NAME,
    id: anime._id
  }));

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState('');
  const [smallImage, setSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [categories, setCategories] = useState([
    "Shounen",
    "Seinen",
    "Shoujo",
    "Isekai",
    "Okul",
    "Polisiye",
    "Psikolojik",
    "Spor",
    "Tarihi",
    "Mecha",
    "Ecchi",
    "Harem",
    "Doğaüstü Güçler",
    "Askeri",
    "Müzikal",
    "Aksiyon", "Dram", "Komedi", "Fantastik", "Romantizm", "Yaşamdan Kesitler", "Gizem", "Korku", "Güçlü Ana Karakter", "Hafif Romantizm", "Zayıftan Güçlüye", "intikam", "Bilim Kurgu","Gerilim","Macera"
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [relatedAnimes, setRelatedAnimes] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((item) => item !== category));
  };

  const handleRelatedAnimesChange = (selectedOptions) => {
    setRelatedAnimes(selectedOptions);
  };

  const handleAddNewAnime = () => {
    dispatch(addNewAnimeRequestAction({
      NAME: name,
      DESCRIPTION: description,
      TOTAL_EPISODES: totalEpisodes,
      FIRST_IMAGE: smallImage,
      SECOND_IMAGE: largeImage,
      SEASON_NUMBER: seasonNumber,
      CATEGORIES: selectedCategories,
      RELATED_ANIMES: relatedAnimes.map(anime => anime.id) // Map the selected related animes to their ids
    }));
  };

  return (
    <div className="w-full h-auto p-4 bg-gray-700 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Add Anime</h2>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Anime Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Total Episodes:</label>
        <input
          type="number"
          value={totalEpisodes}
          onChange={(e) => setTotalEpisodes(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Total Episodes"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Small Image URL:</label>
        <input
          type="text"
          value={smallImage}
          onChange={(e) => setSmallImage(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Small Image URL"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Large Image URL:</label>
        <input
          type="text"
          value={largeImage}
          onChange={(e) => setLargeImage(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Large Image URL"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Season Number:</label>
        <input
          type="number"
          value={seasonNumber}
          onChange={(e) => setSeasonNumber(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Season Number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Categories:</label>
        <div className="flex items-center mb-2">
          <select
            onChange={handleCategoryChange}
            className="p-2 bg-gray-600 text-white rounded w-full"
          >
            <option value="" disabled selected>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <div
              key={category}
              className="flex items-center px-2 py-1 bg-gray-500 text-white rounded"
            >
              {category}
              <button
                type="button"
                onClick={() => handleRemoveCategory(category)}
                className="ml-2 text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Related Animes:</label>
        <Select
          options={animeOptions}
          value={relatedAnimes}
          onChange={handleRelatedAnimesChange}
          isMulti
          className="w-full"
          placeholder="Select Related Animes"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: '#2d2d2d',
              borderColor: '#444',
              borderRadius: '0.375rem',
              boxShadow: 'none',
              minHeight: '3rem',
              height: 'auto', // Allow height to adjust based on content
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: '#2d2d2d',
              borderRadius: '0.375rem',
              marginTop: '0.25rem',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#3b82f6' : '#2d2d2d',
              color: state.isSelected ? '#ffffff' : '#a0aec0',
              '&:hover': {
                backgroundColor: '#3b82f6',
                color: '#ffffff',
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              color: '#a0aec0',
            }),
            input: (provided) => ({
              ...provided,
              color: '#ffffff',
            }),
            menuList: (provided) => ({
              ...provided,
              color: '#ffffff',
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.5rem',
              margin: '0.25rem 0.25rem 0 0',
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: '#ffffff',
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: '#ffffff',
              ':hover': {
                backgroundColor: '#3b82f6',
                color: '#ffffff',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: '#ffffff',
              marginTop: '0.25rem',
            }),
          }}
        />
      </div>
      <button
        onClick={handleAddNewAnime}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Anime
      </button>
    </div>
  );
};

export default AddAnimeForm;
