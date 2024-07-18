import React, { useState } from 'react';

const AnimeForm = () => {
  const [showAddEpisodeForm, setShowAddEpisodeForm] = useState(true);
  const [categories, setCategories] = useState([]);
  const [allCategories] = useState(['Action', 'Comedy', 'Drama', 'Fantasy']);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    const newCategories = selectedOptions.filter(option => !categories.includes(option));
    setCategories([...categories, ...newCategories]);
  };
  
  const handleCategoryRemove = (category) => {
    setCategories(categories.filter(cat => cat !== category));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Anime Formları</h2>
        <div className="flex justify-center mb-4 space-x-2">
          <button
            onClick={() => setShowAddEpisodeForm(true)}
            className={`px-4 py-2 ${showAddEpisodeForm ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300`}
          >
            Anime Bölüm Ekleme
          </button>
          <button
            onClick={() => setShowAddEpisodeForm(false)}
            className={`px-4 py-2 ${!showAddEpisodeForm ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300`}
          >
            Anime Oluşturma
          </button>
        </div>
        <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${showAddEpisodeForm ? 'h-96' : 'h-[700px]'}`}>
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${showAddEpisodeForm ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full flex flex-col justify-start p-4 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Anime Bölüm Ekleme</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime İsmi</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime Bölüm Video URL'si</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kaçıncı Bölüm</label>
                  <input type="number" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Ekle</button>
              </form>
            </div>
          </div>
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${!showAddEpisodeForm ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col justify-start p-4 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Anime Oluşturma</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime İsmi</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime Kapak Fotoğrafı SRC URL'si</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime Özeti</label>
                  <textarea className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Toplam Bölüm Sayısı</label>
                  <input type="number" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori Seçimi</label>
                  <div className="relative">
                    <select
                      multiple
                      onChange={handleCategoryChange}
                      value={categories}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      {allCategories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {categories.map(category => (
                        <span
                          key={category}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => handleCategoryRemove(category)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Oluştur</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeForm;
