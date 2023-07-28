import React from "react";
import ReactPlayer from "react-player";

const Player = (props) => {
  if (!props.modal) return null;
  return (
    <div className="relative items-center justify-center sticky top-0 z-50">
      <div
        onClick={() => props.setModal(false)}
        className="absolute top-0 w-full h-[100vh] bg-opacity-50 bg-black z-40"
      />
      <div
        onClick={() => props.setModal(false)}
        className="absolute top-[43px] hover:cursor-pointer hover:text-red-400 text-white right-[35px] font-poppins font-semibold p-1   z-50"
      ></div>
      <div className="absolute  left-[2%] top-[5vh] w-[96%] h-[90vh] text-white z-40">
        
        <iframe
          className="w-[100%] h-[100%]"
          title="alovera"
          src={props.video}
          allowFullScreen
          
        ></iframe>
      </div>
    </div>
  );
};

export default Player;
