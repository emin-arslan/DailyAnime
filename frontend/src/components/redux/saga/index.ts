import { all, takeEvery } from "redux-saga/effects";
import { GET_ANIME_CARDS } from "../actions/actionTypes";
import { getCardDatas } from "./GetData";

export function* rootSaga() {
  yield all([
    takeEvery(GET_ANIME_CARDS,getCardDatas)
  ]);
}