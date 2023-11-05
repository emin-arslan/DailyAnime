import { all } from "redux-saga/effects";
import { GET_ANIME_CARDS } from "../actions/actionTypes";
import { getCardDatas } from "./GetData";

export function* rootSaga() {
  yield all([
    GET_ANIME_CARDS,getCardDatas()
    // Add other sagas here if you have more
  ]);
}