import React, { useState } from 'react';

const AnimeForm = () => {
  const [showAddEpisodeForm, setShowAddEpisodeForm] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Anime Formları</h2>
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setShowAddEpisodeForm(true)}
            className={`px-6 py-2 ${showAddEpisodeForm ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300`}
          >
            Anime Bölüm Ekleme
          </button>
          <button
            onClick={() => setShowAddEpisodeForm(false)}
            className={`px-6 py-2 ${!showAddEpisodeForm ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300`}
          >
            Anime Oluşturma
          </button>
        </div>
        <div className="relative h-[500px] overflow-hidden">
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${showAddEpisodeForm ? 'transform translate-x-0' : 'transform -translate-x-full '}`}>
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Anime Bölüm Ekleme</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime İsmi</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime Bölüm Video URL'si</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kaçıncı Bölüm</label>
                  <input type="number" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori Seçimi</label>
                  <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Drama</option>
                    <option>Fantasy</option>
                  </select>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Ekle</button>
              </form>
            </div>
          </div>
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${!showAddEpisodeForm ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Anime Oluşturma</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime İsmi</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime Kapak Fotoğrafı SRC URL'si</label>
                  <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anime Özeti</label>
                  <textarea className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Toplam Bölüm Sayısı</label>
                  <input type="number" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Oluştur</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeForm;
