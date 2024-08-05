import { put } from "redux-saga/effects";

export function* getAnimeInfos() {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    
    // API çağrısını yap
    let response = yield fetch(`${API_URL}/animes`);
    
    // Yanıtın JSON formatında olduğunu varsayalım
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    let data = yield response.json();
    
    // Geriye bir action gönderelim
    yield put({ type: 'SET_ANIMES', payload: data });
    
  } catch (error) {
    console.error('Error fetching anime infos:', error);
    // Hata durumunda bir action gönderebilirsiniz, örn: 
    // yield put({ type: 'FETCH_ANIME_INFOS_FAILED', error: error.message });
  }
}
