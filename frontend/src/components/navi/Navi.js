import React, { useEffect, useRef } from "react";
const Navi = ({searchTxt, handleSearch}) => {
  return (
    <div className="w-full drop-shadow-md bg-white sticky top-0 z-30">
      <div className=" min-w-fit ">
        <div className="py-4 ">
          <span className="text-2xl drop-shadow-md text-blue-500 font-semibold font-poppins">
            DailyAnime
          </span>
          
        </div>
        <input 
        value={searchTxt}
        onChange={handleSearch}
        ></input>
      </div>
    </div>
  );
};

export default Navi;
