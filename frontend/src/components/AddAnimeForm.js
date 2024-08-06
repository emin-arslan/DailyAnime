import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewAnimeRequestAction } from './redux/actions/action';

const AddAnimeForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState('');
  const [smallImage, setSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
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
    "Aksiyon", "Dram", "Komedi", "Fantastik", "Romantik", "Yaşamdan Kesitler", "Gizem",  "Korku","Güçlü Ana Karakter","Hafif Romantizm","Zayıftan Güçlüye"
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((item) => item !== category));
  };

  const handleAddNewAnime = () =>{
    dispatch(addNewAnimeRequestAction({
      NAME: name,
      DESCRIPTION: description,
      TOTAL_EPISODES: totalEpisodes,
      FIRST_IMAGE: smallImage,
      SECOND_IMAGE: largeImage,
      CATEGORIES: selectedCategories
    }))
  }

  return (
    <div className="w-full h-full p-4 bg-gray-700 rounded-lg">
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
      <button
        onClick={()=>handleAddNewAnime()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Anime
      </button>
    </div>
  );
};

export default AddAnimeForm;
