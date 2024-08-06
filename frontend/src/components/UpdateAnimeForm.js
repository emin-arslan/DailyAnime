import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAnimes } from './redux/selector';
import { updateAnime } from './redux/actions/action';

const UpdateAnimeForm = () => {
  const animes = useSelector(getAnimes);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [animeID, setAnimeID] = useState('');
  const [description, setDescription] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState('');
  const [smallImage, setSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Convert the anime names to the required format
  const nameOptions = animes.map(anime => ({
    value: anime.NAME,
    label: anime.NAME,
    id: anime._id
  }));

  const categoryOptions = [
    { value: 'Shounen', label: 'Shounen' },
    { value: 'Seinen', label: 'Seinen' },
    { value: 'Shoujo', label: 'Shoujo' },
    { value: 'Isekai', label: 'Isekai' },
    { value: 'Okul', label: 'Okul' },
    { value: 'Polisiye', label: 'Polisiye' },
    { value: 'Psikolojik', label: 'Psikolojik' },
    { value: 'Spor', label: 'Spor' },
    { value: 'Tarihi', label: 'Tarihi' },
    { value: 'Mecha', label: 'Mecha' },
    { value: 'Ecchi', label: 'Ecchi' },
    { value: 'Harem', label: 'Harem' },
    { value: 'Doğaüstü Güçler', label: 'Doğaüstü Güçler' },
    { value: 'Askeri', label: 'Askeri' },
    { value: 'Müzikal', label: 'Müzikal' },
    { value: 'Aksiyon', label: 'Aksiyon' },
    { value: 'Dram', label: 'Dram' },
    { value: 'Komedi', label: 'Komedi' },
    { value: 'Fantastik', label: 'Fantastik' },
    { value: 'Romantik', label: 'Romantik' },
    { value: 'Yaşamdan Kesitler', label: 'Yaşamdan Kesitler' },
    { value: 'Gizem', label: 'Gizem' },
    { value: 'Korku', label: 'Korku' },
    { value: 'Güçlü ana karakter', label: 'Güçlü ana karakter' },
    { value: 'Zayıf ana karakter', label: 'Zayıf ana karakter' }
  ];
  
  

  const handleNameChange = (selectedOption) => {
    setName(selectedOption ? selectedOption.value : '');
    setAnimeID(selectedOption  ? selectedOption.id: '')
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleSubmit = (e) => {
      dispatch(updateAnime({
      id: animeID,
      name,
      description,
      totalEpisodes,
      smallImage,
      largeImage,
      categories: selectedCategories.map(option => option.value),
    }));
  };

  return (
    <div className="w-full h-full p-4 bg-gray-700 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl text-white mb-4">Update Anime</h2>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Name:</label>
        <Select
          options={nameOptions}
          value={nameOptions.find(option => option.value === name)}
          onChange={handleNameChange}
          className="w-full"
          placeholder="Select an Anime"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: '#2d2d2d',
              borderColor: '#444',
              borderRadius: '0.375rem',
              boxShadow: 'none',
              minHeight: '3rem',
              height: '3rem',
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
            singleValue: (provided) => ({
              ...provided,
              color: '#ffffff',
            }),
            input: (provided) => ({
              ...provided,
              color: '#ffffff',
            }),
            menuList: (provided) => ({
              ...provided,
              color: '#ffffff',
            }),
          }}
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
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleCategoryChange}
          className="w-full"
          placeholder="Select Categories"
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
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Update Anime
      </button>
    </div>
  );
};

export default UpdateAnimeForm;
