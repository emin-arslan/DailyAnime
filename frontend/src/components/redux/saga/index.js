import { all, take, takeEvery } from "redux-saga/effects";
import { GET_HOMEPAGE_ANIMES } from "../actions/actionTypes";
import { GetHomePageAnimes } from "./GetHomePageAnimes";

export function* rootSaga() {
  yield all([
    takeEvery(GET_HOMEPAGE_ANIMES, GetHomePageAnimes)
  ]);
}