import { put, call } from "redux-saga/effects";
import { SET_HOMEPAGE_ANIMES } from "../actions/actionTypes";

export function* GetHomePageAnimes({ count }) {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = yield call(fetch, `${API_URL}/getHomePageAnimes/${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const animes = yield response.json(); // JSON olarak parse et

    // Gelen veriyi Redux store'a dispatch et
    yield put({ type: SET_HOMEPAGE_ANIMES, payload: animes });

  } catch (error) {
    console.error('Error fetching episode info:', error);
  }
}
