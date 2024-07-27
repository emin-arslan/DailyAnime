import { put } from "redux-saga/effects";
import { ADD_ANIME_SUCCESS, SET_ANIME_DATA } from "../actions/actionTypes";

export function* addNewAnime({animeData}) {
  try {
    let response = yield fetch("http://localhost:5000/addAnime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animeData),
      });
      

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let result = yield response.json(); // Directly parse JSON from the response

    // Assuming the response contains the anime data
    const cards = result.body; 
    yield put({ type: ADD_ANIME_SUCCESS});
  } catch (error) {
    // Handle the error appropriately
    console.error("Error adding new anime:", error);
  }
}
