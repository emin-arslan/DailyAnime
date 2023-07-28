import React, { useState } from "react";
import { useSelector } from "react-redux";
import AnimeCardState from "./components/redux/state/AnimeCardState";
import Navi from "./components/navi/Navi";
import Player from "./components/Player";

interface IState {
  cards: AnimeCardState[]
}

interface IAnime {
  animeDataReducer: IState
}

function App() {
  const animeCards: IAnime = useSelector((state: IAnime) => state);
  const [modal, setModal] = useState(false)
  const [video, setVideo] = useState("")
  return (
    <div className="w-full  relative transition-all">
      <Player modal={modal} video={video} setModal={setModal}/>
      <Navi />
      <div className="container mx-auto flex justify-center min-w-[300px] sm:w-[600px] ">


        <div className="grid grid-cols-6 w-fit gap-4 mt-5 md:grid-cols-4 sm:grid-cols-2 sm:w-[500px] ">
          {
            animeCards.animeDataReducer.cards.map(card => {
              const color = card.source == "Chinese" ? "from-green-900":"from-red-900"
              return (
                <div>
                  <div  className="relative hover:cursor-pointer hover:z-20 hover:scale-[1.17] transition-all s ">
                    <img onClick={() => {
                    setVideo(card.videoUrl)
                    setModal(true)
                  }} alt="resim" src={card.imageUrl} className="w-40 h-[225px]  rounded-xl"></img>
                    <div className="absolute bottom-0 text-sm font-semibold px-2 py-2 w-full text-gray-100 bg-gradient-to-t  from-black">
                      {card.episode}
                    </div>
              
                    <div
                     onClick={()=>window.open(card.watchLink,"_blank")} className={`absolute top-0 right-0 p-1 px-2 bg-gradient-to-b  z-20 text-xs text-white ${color} hover:animate-pulse font-semibold rounded-tr-xl`}>{card.source}</div>
                    
                  </div>
                  <p className="w-40 text-xs text-center line-clamp-2">{card.title}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
