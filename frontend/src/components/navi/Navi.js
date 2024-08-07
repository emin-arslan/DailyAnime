import React, { useState } from "react";
import logo from "../../assets/logo4.png";
import { useSelector } from "react-redux";
import { getHomePageAnimesSelector } from "../redux/selector";

const handleLogoClick = () => {
  window.location.href = "/";
};

const Navi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const animes = useSelector(getHomePageAnimesSelector);

  const handleAnimeInfo = (name) => {
    setSearchTerm(name);
    const encodedName = encodeURIComponent(name);
    window.location.href = `/animeInfo/name?query=${encodedName}`;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = animes.filter((anime) =>
        anime.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <nav className="bg-[#353636] w-full sticky top-0 z-40 shadow-md">
      <div className="relative flex sm:flex-row xs:flex-row  mx-auto items-center justify-between py-4 px-6 max-w-screen-xl ">
        <img
          onClick={handleLogoClick}
          src={logo}
          alt="animeelysium"
          className="h-10 cursor-pointer select-none transition-transform transform hover:scale-110 xs:h-5 sm:h-5"
        />
        <div className="flex-1 max-w-lg w-9/12 relative z-50 xs:hidden sm:hidden md:hidden">
          <input
            type="text"
            placeholder="Search for anime, characters, genres..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-9/12 mx-auto flex py-2 px-4 z-50 xs:py-2 xs:w-full bg-[#252525] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3f4040] transition-all placeholder-opacity-80"
          />
          {suggestions.length > 0 ? (
            <ul className="absolute w-full bg-[#353636] border mt-4 border-gray-600 text-white z-50 rounded-md max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleAnimeInfo(suggestion.name)}
                  className="flex items-center z-50 px-4 py-2 hover:bg-[#3f4040] cursor-pointer"
                >
                  <img
                    src={suggestion.first_image}
                    alt={suggestion.name}
                    className="h-8 w-8 mr-2 object-cover"
                  />
                  {suggestion.name}
                </li>
              ))}
            </ul>
          ) : searchTerm ? (
            <div className="absolute w-full bg-[#353636] border border-gray-600 text-white mt-1 rounded-md p-4">
              Üzgünüz, aradığınız kriterlere uygun bir sonuç bulunamadı.
            </div>
          ) : null}
        </div>
        <div className="flex items-center space-x-6  text-white sm:text-xs xs:text-xs md:text-xs">
          <a
            href="/"
            className="hover:text-blue-500 transition-colors font-semibold"
          >
            Anasayfa
          </a>
          <a
            href="/categories"
            className="hover:text-blue-500 transition-colors font-semibold"
          >
            Kategoriler
          </a>
          <a
            href="#contact"
            className="hover:text-blue-500 transition-colors font-semibold"
          >
            Favorilerim
          </a>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-[#353636] via-[#1f2229] to-transparent backdrop-blur-sm" />
      </div>
      <div className="flex-1 w-full relative z-50 hidden xs:flex sm:flex md:flex">
        <input
          type="text"
          placeholder="Search for anime, characters, genres..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-2 px-4 z-50 xs:py-2 xs:w-full sm:py-2 sm:w-full bg-[#252525] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3f4040] transition-all placeholder-opacity-80"
        />
        {suggestions.length > 0 ? (
          <ul className="absolute w-full bg-[#353636] border mt-4 xs:mt-10 sm:mt-10 border-gray-600 text-white z-50 rounded-md max-h-40 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleAnimeInfo(suggestion.name)}
                className="flex items-center z-50 px-4 py-2 hover:bg-[#3f4040] cursor-pointer"
              >
                <img
                  src={suggestion.first_image}
                  alt={suggestion.name}
                  className="h-8 w-8 mr-2 object-cover"
                />
                {suggestion.name}
              </li>
            ))}
          </ul>
        ) : searchTerm ? (
          <div className="absolute w-full bg-[#353636] border border-gray-600 text-white mt-1 rounded-md p-4">
            Üzgünüz, aradığınız kriterlere uygun bir sonuç bulunamadı.
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navi;
