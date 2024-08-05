import { put } from "redux-saga/effects";
import { SET_ANIME_INFO } from "../actions/actionTypes";

export function* getAnime(payload) {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    
    // API çağrısını yap
    let response = yield fetch(`${API_URL}/searchAnime`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    });

    
    // Yanıtın JSON formatında olduğunu varsayalım
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    let data = yield response.json();
    yield put({ type: SET_ANIME_INFO, payload:  data});
    
    // Geriye bir action gönderelim
    //yield put({ type: 'SET_ANIMES', payload: data });
    
  } catch (error) {
    console.error('Error fetching anime infos:', error);
    // Hata durumunda bir action gönderebilirsiniz, örn: 
    // yield put({ type: 'FETCH_ANIME_INFOS_FAILED', error: error.message });
  }
}
