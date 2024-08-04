import { all, take, takeEvery } from "redux-saga/effects";
import { ADD_NEW_ANIME_REQUEST, ADD_NEW_EPISODE_REQUEST, GET_ANIME_REQUEST, GET_ANIMES, GET_HOMEPAGE_ANIMES, UPDATE_ANIME_REQUEST, UPDATE_EPISODE_REQUEST } from "../actions/actionTypes";
import { GetHomePageAnimes } from "./GetHomePageAnimes";
import { AddNewAnime } from "./AddNewAnime";
import { getAnimeInfos } from "./GetAnimeInfos";
import { addNewEpisode } from "./AddNewEpisode";
import { updateEpisode } from "./updateEpisode";
import { UpdateAnime } from "./UpdateAnime";
import { getAnime } from "./GetAnime";

export function* rootSaga() {
  yield all([
    takeEvery(GET_HOMEPAGE_ANIMES, GetHomePageAnimes),
    takeEvery(ADD_NEW_ANIME_REQUEST, AddNewAnime),
    takeEvery(GET_ANIMES, getAnimeInfos),
    takeEvery(ADD_NEW_EPISODE_REQUEST, addNewEpisode),
    takeEvery(UPDATE_EPISODE_REQUEST, updateEpisode),
    takeEvery(UPDATE_ANIME_REQUEST, UpdateAnime),
    takeEvery(GET_ANIME_REQUEST, getAnime),
  ]);
}