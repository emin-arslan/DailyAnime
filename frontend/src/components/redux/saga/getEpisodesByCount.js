/*import { put } from "redux-saga/effects";
import { GET_ANIME_INFOS_REQUEST, SET_ANIME_DATA, SET_ANIME_EPISODESBYCOUNT, SET_ANIME_EPISODESBYID, SET_ANIME_INFOS, SET_ANIME_INFOS_REQUEST } from "../actions/actionTypes";

export function* getEpisodeInfoByCount({count}) {
  try {
    let response = yield fetch(`https://daily-anime-omega.vercel.app/episodes?count=${count}`);
    let reader = response.body.getReader();
    let result = yield reader.read();
    console.log(count, "id ile eşleşen bölümelr");
    if (!result.done) {
     
      let data = result.value; // Veri, Uint8Array olarak döner
      let text = new TextDecoder().decode(data); // Uint8Array verisini metne dönüştürme
      console.log(text);
      const parsedData = JSON.parse(text);
      const animeEpisodesById = parsedData.body;
      yield put({ type: SET_ANIME_EPISODESBYCOUNT, animeEpisodesById });
    }
  } catch (error) {
    console.error('Error fetching episode info:', error);
  }
}*/

