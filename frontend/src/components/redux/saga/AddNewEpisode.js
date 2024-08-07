import { put } from 'redux-saga/effects';
import { SET_REQUEST_STATUS } from '../actions/actionTypes';

export function* addNewEpisode(paylaod) {
  const API_URL = process.env.REACT_APP_API_URL;

  try {
    const response = yield fetch(`${API_URL}/addNewEpisode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...paylaod}),
    });

    if (!response.ok) {
      // Sunucudan gelen hata mesajını JSON olarak parse et
      const errorResponse = yield response.json();

      // Hata durumunda STATE güncelle
      yield put({
        type: SET_REQUEST_STATUS,
        payload: {
          isSuccessful: false,
          message: errorResponse.message,
        },
      });
    } else {
      // Başarılı yanıtı JSON olarak parse et
      const result = yield response.json();

      // Başarı durumunda STATE güncelle
      yield put({
        type: SET_REQUEST_STATUS,
        payload: {
          isSuccessful: true,
          message: "Episode added successfully",
        },
      });
    }

  } catch (error) {
    // Hata durumunda uygun şekilde STATE güncelle
    console.error("Error adding new episode:", error);
    yield put({
      type: SET_REQUEST_STATUS,
      payload: {
        isSuccessful: false,
        message: error.message,
      },
    });
  }
}
