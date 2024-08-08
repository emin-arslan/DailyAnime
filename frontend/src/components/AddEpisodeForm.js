import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAnimes } from './redux/selector';
import { addNewEpisodeRequestAction } from './redux/actions/action';

const AddEpisodeForm = () => {
  const dispatch = useDispatch();
  const animes = useSelector(getAnimes);

  // Map animes to options with both NAME and LAST_PUBLISHED_EPISODE
  const animeOptions = animes.map(anime => ({
    value: anime.NAME,
    label: anime.NAME,
    lastPublishedEpisode: anime.LAST_PUBLISHED_EPISODE + 1,
    id: anime._id
  }));

  const [animeName, setAnimeName] = useState(null);
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [link3, setLink3] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [animeID, setAnimeID] = useState('');
  const [type, setType] = useState('');

  // Handle changes in the Select component
  const handleAnimeChange = (selectedOption) => {
    setAnimeName(selectedOption);
    if (selectedOption) {
      setEpisodeNumber(selectedOption.lastPublishedEpisode || '');
      setAnimeID(selectedOption.id);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(addNewEpisodeRequestAction({
      animeId: animeID,
      watchLink1: link1,
      watchLink2: link2,
      watchLink3: link3,
      episodeNumber: episodeNumber,
      type: type,
    }));
  };

  return (
    <div className="w-full h-full p-4 bg-gray-700 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Add Episode</h2>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Anime Name:</label>
        <Select
          options={animeOptions}
          value={animeName}
          onChange={handleAnimeChange}
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

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Viewing Link 1:</label>
        <input
          type="text"
          value={link1}
          onChange={(e) => setLink1(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Viewing Link 1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Viewing Link 2:</label>
        <input
          type="text"
          value={link2}
          onChange={(e) => setLink2(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Viewing Link 2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Viewing Link 3:</label>
        <input
          type="text"
          value={link3}
          onChange={(e) => setLink3(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Viewing Link 3"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-300 mb-1">Episode Number</label>
          <div className="text-green-500 text-sm">
            Suggested Episode: {animeName ? animeName.lastPublishedEpisode : ''}
          </div>
        </div>
        <input
          type="number"
          value={episodeNumber}
          onChange={(e) => setEpisodeNumber(e.target.value)}
          className="w-full p-2 bg-gray-600 text-white rounded"
          placeholder="Episode Number"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Episode Type:</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="ova"
              checked={type === 'ova'}
              onChange={handleTypeChange}
              className="form-radio text-blue-500 h-5 w-5"
            />
            <span className="ml-2 text-gray-300">Ova</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="special"
              checked={type === 'special'}
              onChange={handleTypeChange}
              className="form-radio text-blue-500 h-5 w-5"
            />
            <span className="ml-2 text-gray-300">Special</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="extra"
              checked={type === 'extra'}
              onChange={handleTypeChange}
              className="form-radio text-blue-500 h-5 w-5"
            />
            <span className="ml-2 text-gray-300">Ekstra</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Episode
      </button>
    </div>
  );
};

export default AddEpisodeForm;
