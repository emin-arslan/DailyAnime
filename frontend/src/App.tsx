import React, { useState } from "react";
import Navi from "./components/navi/Navi";
import Player from "./components/Player";
import HomePage from "./components/HomePage";

function App() {
  const [video, setVideo] = useState("")
  const [modal, setModal] = useState(false)
  const favoriAnimes = localStorage.getItem("favoriAnimes");
  !favoriAnimes && localStorage.setItem("favoriAnimes", JSON.stringify([]));

  return (
    <div className="w-full relative transition-all">
      <Player modal={modal} video={video} setModal={setModal} />
      <Navi />
      <HomePage setModal={setModal} setVideo={setVideo} />
    </div>
  );
}

export default App;
