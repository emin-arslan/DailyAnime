import { put } from "redux-saga/effects";
import { ADD_ANIME_SUCCESS, SET_ANIME_DATA } from "../actions/actionTypes";

export function* addNewEpisode({animeEpisode}) {
   console.log(animeEpisode, "bölüm ekleme");
  try {
    let response = yield fetch("http://localhost:5000/addEpisode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animeEpisode),
      });
      

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let result = yield response.json(); // Directly parse JSON from the response

    // Assuming the response contains the anime data
    
  } catch (error) {
    // Handle the error appropriately
    console.error("Error adding new anime:", error);
  }
}