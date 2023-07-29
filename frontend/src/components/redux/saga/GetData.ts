import { put } from "redux-saga/effects";
import { SET_ANIME_DATA } from "../actions/actionTypes";
import { json } from "stream/consumers";

export function* getCardDatas(): Generator<any, void, any> {
  try {
    let response = yield fetch("http://localhost:5000/animes");
    let reader = response.body.getReader();
    
    let result = yield reader.read();
    
    if (!result.done) {
      let data = result.value; // Veri, Uint8Array olarak döner
      let text = new TextDecoder().decode(data); // Uint8Array verisini metne dönüştürme
      const parsedData = JSON.parse(text);
      const cards = parsedData.body
      yield put({ type: SET_ANIME_DATA, cards });
    } else {
    }
  } catch (error) {
  }
}
