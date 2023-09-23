import React, { useState } from "react";
import Navi from "./components/navi/Navi";
import Player from "./components/Player";
import HomePage from "./components/HomePage";
import { useDispatch } from "react-redux";
import { GET_ANIME_CARDS } from "./components/redux/actions/actionTypes";
import { getAnimeDatas } from "./components/redux/actions/action";

function App() {
  const dispatch = useDispatch();
  const [video, setVideo] = useState("")
  const [modal, setModal] = useState(false)
  const favoriAnimes = localStorage.getItem("favoriAnimes");
  !favoriAnimes && localStorage.setItem("favoriAnimes", JSON.stringify([]));
  dispatch(getAnimeDatas());
  return (
    <div className="w-full relative transition-all">
      <Player modal={modal} video={video} setModal={setModal} />
      <Navi />
      <HomePage setModal={setModal} setVideo={setVideo} />
    </div>
  );
}

export default App;
