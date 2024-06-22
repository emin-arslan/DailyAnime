import React, { useEffect, useState } from "react";
import Navi from "./components/navi/Navi";
import Player from "./components/Player";
import HomePage from "./components/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { getAnimeDatas } from "./components/redux/actions/action";
import { getAnimeCards } from "./components/redux/selector";

function App() {
  const dispatch = useDispatch();
  const [video, setVideo] = useState("")
  const [modal, setModal] = useState(false)
  const [searchTxt, setSearchTxt] = useState("");
  
  const anime = useSelector(getAnimeCards);

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value);
  }

  useEffect(()=>{
    dispatch(getAnimeDatas());
  },[dispatch])

  const filteredAnimes = searchTxt.length > 0 ? anime.filter((animeItem) => animeItem.title.toLowerCase().includes(searchTxt.toLowerCase())) : [];

  const favoriAnimes = localStorage.getItem("favoriAnimes");

  !favoriAnimes && localStorage.setItem("favoriAnimes", JSON.stringify([]));

  return (
    <div className="w-full relative transition-all">
      <Player modal={modal} video={video} setModal={setModal} />
      <Navi searchTxt={searchTxt} handleSearch={handleSearch}/>
      <HomePage setModal={setModal} setVideo={setVideo} filteredAnimes={filteredAnimes} />
    </div>
  );
}

export default App;
