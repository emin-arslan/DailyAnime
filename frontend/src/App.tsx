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
      <Player modal={modal} video={video} setModal={setModal} />
      <Navi />
      <div className="flex justify-center w-full items-center pb-8">
        {
          animeCards.animeDataReducer.cards.length < 2 ?
            <div className="flex w-full h-[60vh] justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-9 w-9 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>

            </div>
            : <div className="grid grid-cols-6 gap-4 mt-5 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1  min-w-[220px] w-auto  place-content-center ">
              {
                animeCards.animeDataReducer.cards.map(card => {
                  const color = card.source == "Chinese" ? "from-green-900" : "from-red-900"
                  return (
                    <div className="max-w-[220px]">

                      <div className="relative hover:cursor-pointer hover:z-20 hover:scale-[1.17] transition-all ">
                        <img onClick={() => {
                          setVideo(card.videoUrl)
                          setModal(true)
                        }} alt="resim" src={card.imageUrl} className="w-full h-72 rounded-xl "></img>

                        <div className="absolute space-y-2 font-poppins bg-[rgba(48,57,73,.6)] rounded-b-xl  bottom-0 text-sm font-semibold  p-2 py-3 w-full text-gray-100 bg-gradient-to-t  from-black">
                          <div className="">
                            <p className="text-md line-clamp-1 w-full font-light">{card.title}</p>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-light text-orange-300"> <span>Turkish</span> </div>
                            <div className="w-6/12 flex justify-end font-light text-xs items-center text-blue-300"> <span>{card.episode}</span></div>
                          </div>

                        </div>


                        <div
                          onClick={() => window.open(card.watchLink, "_blank")} className={`absolute top-0 right-0 p-1 px-2 bg-gradient-to-b  z-0 text-xs text-white ${color} hover:animate-pulse font-semibold rounded-tr-xl`}>{card.source}</div>

                      </div>

                    </div>
                  )
                })
              }
            </div>
        }


      </div>
    </div>
  );
}

export default App;
