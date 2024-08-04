import { put } from 'redux-saga/effects';
import { SET_REQUEST_STATUS } from '../actions/actionTypes';


export function* AddNewAnime({ payload }) {

  const API_URL = process.env.REACT_APP_API_URL;
  console.log(payload, "anime");
  try {
    let response = yield fetch(`${API_URL}/addNewAnime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Sunucudan gelen hata mesajını parse et
      let errorResponse = yield response.json();
      console.log(errorResponse, "error");
      yield put({ type: SET_REQUEST_STATUS, payload: { isSuccessful: response.ok, message: errorResponse.message } });
    }
    else
    {
      let result = yield response.json(); // Cevabı JSON olarak parse et
      // Başarılı response işleme
      console.log("Anime added successfully:", result);
      yield put({ type: SET_REQUEST_STATUS, payload: { isSuccessful: true, message: "Anime added successfully" } });
    }
   
  } catch (error) {
    // Hata durumunda uygun şekilde işleme
    console.error("Error adding new anime:", error);
    yield put({ type: SET_REQUEST_STATUS, payload: { isSuccessful: false, message: error.message } });
  }
}
