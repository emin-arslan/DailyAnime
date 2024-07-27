import logo from "../../assets/logo2.webp"

const Navi = ({ searchTxt, setSearchTxt, setModal, animeListingType, setAnimeListingType }) => {
  return (
    <nav onClick={()=>setModal(false)} className="bg-black w-full sticky top-0 z-50">
      <div className="mx-auto px-4 flex items-center justify-between py-3 md:flex-col sm:flex-col xs:flex-col md:space-y-2 sm:space-y-2 xs:space-y-2">
        <img src={logo} className="w-20 h-10"/>
        <div className="flex items-center space-x-4 max-w-full">
          <input
            type="text"
            placeholder="Search for anime, characters, genres..."
            value={searchTxt}
            onChange={(e)=>setSearchTxt(e.target.value)}
            className="w-96 py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700"
          />
        </div>
        <div className="flex items-center space-x-6 text-white">
          <span onClick={()=> { setAnimeListingType("All"); setSearchTxt(""); }} className={`hover:text-gray-300 hover:cursor-pointer select-none transition duration-150 ${animeListingType === "All" && 'text-orange-400 hover:text-orange-900'}`}>Home</span>
          <span onClick={()=>{setAnimeListingType("Favorites"); setSearchTxt("")}} className={`hover:text-gray-300 hover:cursor-pointer select-none transition duration-150 ${animeListingType === "Favorites" && 'text-orange-400 hover:text-orange-900'}`}>Favorites</span>
          <span onClick={()=>{setAnimeListingType("WatchedList"); setSearchTxt("")}} className={`hover:text-gray-300 hover:cursor-pointer select-none transition duration-150 ${animeListingType === "WatchedList" && 'text-orange-400 hover:text-orange-900'}`}>WatchedList</span>
        </div>
      </div>
    </nav>
  );
};

export default Navi;
