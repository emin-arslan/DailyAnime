const Navi = ({ searchTxt, handleSearch, setModal }) => {
  return (
    <nav onClick={()=>setModal(false)} className="bg-black w-full sticky top-0 z-50">
      <div className="mx-auto px-4 flex items-center justify-between py-3 md:flex-col sm:flex-col xs:flex-col md:space-y-2 sm:space-y-2 xs:space-y-2">
        <span className="text-3xl text-white font-semibold">DailyAnime</span>
        <div className="flex items-center space-x-4 max-w-full">
          <input
            type="text"
            placeholder="Search for anime, characters, genres..."
            value={searchTxt}
            onChange={handleSearch}
            className="w-96 py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700"
          />
        </div>
        <div className="flex items-center space-x-6 text-white">
          <a href="#" className="hover:text-gray-300 transition duration-150">Home</a>
          <a href="#" className="hover:text-gray-300 transition duration-150">Favorites</a>
          <a href="#" className="hover:text-gray-300 transition duration-150">WatchedList</a>
        </div>
      </div>
    </nav>
  );
};

export default Navi;
