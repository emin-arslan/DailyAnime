import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAnimes } from './redux/selector';
import { useLocation, useNavigate } from 'react-router-dom';

const allCategories = [
  "Shounen", "Seinen", "Shoujo", "Isekai", "Okul", "Polisiye", "Psikolojik",
  "Spor", "Tarihi", "Mecha", "Ecchi", "Harem", "Doğaüstü Güçler", "Askeri",
  "Müzikal", "Aksiyon", "Dram", "Komedi", "Fantastik", "Romantizm",
  "Yaşamdan Kesitler", "Gizem", "Korku", "Güçlü Ana Karakter", "Hafif Romantizm",
  "Zayıftan Güçlüye", "İntikam", "Bilim Kurgu", "Gerilim"
];

const CategoryFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const navigate = useNavigate();
  const animes = useSelector(getAnimes);

  // Initialize selected categories based on query parameter
  const [selectedCategories, setSelectedCategories] = useState(() => {
    return allCategories.includes(query) ? [query] : [];
  });
  const [filteredCategories, setFilteredCategories] = useState(allCategories);

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page scroll is at the top
  }, []);

  useEffect(() => {
    // When query parameter changes, update selected categories
    if (allCategories.includes(query)) {
      setSelectedCategories([query]);
    } else {
      setSelectedCategories([]);
    }
  }, [query]);

  useEffect(() => {
    // Filter categories to ensure the query category is always included
    const uniqueCategories = new Set(selectedCategories);
    if (query && allCategories.includes(query)) {
      uniqueCategories.add(query);
    }
    setFilteredCategories(
      Array.from(uniqueCategories).concat(
        allCategories.filter(category => !uniqueCategories.has(category)).slice(0, 9)
      )
    );
  }, [selectedCategories, query]);

  const handleCategoryFilter = (e) => {
    const filterText = e.target.value.toLowerCase();
    setFilteredCategories(
      allCategories.filter((category) =>
        category.toLowerCase().includes(filterText)
      )
    );
  };

  const handleAnimeInfo = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/animeInfo/name?query=${encodedName}`);
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

  // If no categories are selected, show the first 5 anime
  const displayedAnimes = selectedCategories.length
    ? animes.filter((anime) =>
        selectedCategories.every((category) => anime.CATEGORIES.includes(category))
      )
    : animes.slice(0, 5);

  // Display selected categories first, then filtered categories
  const displayedCategories = selectedCategories.length
    ? [...selectedCategories, ...filteredCategories.filter(category => !selectedCategories.includes(category)).slice(0, 9)]
    : filteredCategories.slice(0, 10);

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
      <div className="grid grid-cols-5 xl:grid-cols-4 gap-4 mb-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-4">
        {displayedCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`w-52 h-52 xl:w-54 xl:h-54 lg:w-44 lg:h-44 md:w-36 md:h-36 sm:h-20 sm:w-20 xs:w-16 xs:h-16 sm:text-xs xs:text-xs flex items-center justify-center text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 focus:outline-none ${
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
          {displayedAnimes.length ? (
            displayedAnimes.map((anime) => (
              <li
                key={anime._id}
                onClick={() => handleAnimeInfo(anime.NAME)}
                className="bg-[#252525] p-4 rounded-lg shadow-md relative overflow-hidden cursor-pointer"
                style={{ backgroundImage: `url(${anime.SECOND_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 backdrop-blur bg-black opacity-50"></div>
                <div className="relative z-10"> 
                  <h4 className="text-xl font-semibold">{anime.NAME} </h4>

                  
                  <p className="line-clamp-2">{anime.DESCRIPTION}</p>
                  <div className='flex space-x-2 mt-2'>
                  {
                    anime?.CATEGORIES.map(e => (
                        <span key={e} className="bg-[#252525] opacity-70 text-xs h-min    text-white rounded-lg p-1" >{e}</span>
                    ))
                  }
                  </div>
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
