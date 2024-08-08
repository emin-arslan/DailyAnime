import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAnimes } from './redux/selector';

const allCategories = [
  "Shounen", "Seinen", "Shoujo", "Isekai", "Okul", "Polisiye", "Psikolojik",
  "Spor", "Tarihi", "Mecha", "Ecchi", "Harem", "Doğaüstü Güçler", "Askeri",
  "Müzikal", "Aksiyon", "Dram", "Komedi", "Fantastik", "Romantizm",
  "Yaşamdan Kesitler", "Gizem", "Korku", "Güçlü Ana Karakter", "Hafif Romantizm",
  "Zayıftan Güçlüye", "İntikam", "Bilim Kurgu", "Gerilim"
];

const CategoryFilter = () => {
  const animes = useSelector(getAnimes);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(allCategories);

  const handleCategoryFilter = (e) => {
    const filterText = e.target.value.toLowerCase();
    setFilteredCategories(
      allCategories.filter((category) =>
        category.toLowerCase().includes(filterText)
      )
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
    setFilteredCategories(allCategories.slice(0, 10));
  };

  // If no categories are selected, show the first 10 categories
  const displayedCategories = selectedCategories.length
    ? filteredCategories
    : allCategories.slice(0, 10);

  // Collect results from all selected categories
  const results = animes.filter((anime) =>
    selectedCategories.every((category) => anime.CATEGORIES.includes(category))
  );

  return (
    <div className="p-6 bg-[#353535] text-white rounded-lg shadow-lg min-h-[100vh]">
      <h2 className="text-3xl font-bold mb-4">Kategorilere Göre Filtrele</h2>

      {/* Kategori Filtreleme İçin Arama Kutusu */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Kategorileri filtrele..."
          onChange={handleCategoryFilter}
          className="w-full px-4 py-3 rounded-lg border border-[#252525] bg-[#353535] text-white focus:outline-none focus:ring-2 focus:ring-[#151515]"
        />
      </div>

      {/* Kategori Butonları */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {filteredCategories.slice(0, 10).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`w-56 h-56 flex items-center justify-center text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 focus:outline-none ${
              selectedCategories.includes(category)
                ? 'bg-blue-700 text-white shadow-lg'
                : 'bg-[#252525] text-gray-200 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Temizle Butonu */}
      {selectedCategories.length > 0 && (
        <button
          onClick={handleClearCategories}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mb-6 transition-colors"
        >
          Temizle
        </button>
      )}

      {/* Anime Bilgileri */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Sonuçlar</h3>
        {selectedCategories.length > 0 && (
          <p className="text-sm text-gray-400 mb-4">
            Gösterilen Sonuçlar: {selectedCategories.join(', ')}
          </p>
        )}
        <ul className="space-y-4">
          {results.length ? (
            results.map((anime) => (
              <li
                key={anime._id}
                className="bg-[#252525] p-4 rounded-lg shadow-md relative overflow-hidden"
                style={{ backgroundImage: `url(${anime.SECOND_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center',}}
              >
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold">{anime.NAME}</h4>
                  <p className="truncate">{anime.DESCRIPTION}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-400">Bu kategorilerde anime bulunamadı.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
