import { put } from "redux-saga/effects";
import { GET_ANIME_INFOS_REQUEST, SET_ANIME_DATA, SET_ANIME_INFOS, SET_ANIME_INFOS_REQUEST } from "../actions/actionTypes";

export function* getAnimeInfos(){
  try {
    let response = yield fetch("http://localhost:5000/animeInfos");
    let reader = response.body.getReader();
    let result = yield reader.read();
    
    if (!result.done) {
      let data = result.value; // Veri, Uint8Array olarak döner
      let text = new TextDecoder().decode(data); // Uint8Array verisini metne dönüştürme
      const parsedData = JSON.parse(text);
      const animeInfos = parsedData.body
      console.log(animeInfos, "SAGA");
      yield put({ type: SET_ANIME_INFOS, animeInfos });
      
    } else {
    }
  } catch (error) {
  }
}
