import { all, takeEvery } from "redux-saga/effects";
import { ADD_ANIME_REQUEST, ADD_NEW_EPISODE_REQUEST, GET_ANIME_CARDS, GET_ANIME_EPISODES_BYID_REQUEST, GET_ANIME_INFOS_REQUEST } from "../actions/actionTypes";
import { getCardDatas } from "./GetData";
import { addNewAnime } from "./AddNewAnime";
import { getAnimeInfos } from "./GetAnimeInfos";
import { getEpisodeInfoById } from "./GetEpisodeInfoById";
import { addNewEpisode } from "./AddNewEpisode";

export function* rootSaga() {
  yield all([
    takeEvery(GET_ANIME_CARDS,getCardDatas),
    takeEvery(ADD_ANIME_REQUEST, addNewAnime),
    takeEvery(GET_ANIME_INFOS_REQUEST, getAnimeInfos),
    takeEvery(GET_ANIME_EPISODES_BYID_REQUEST, getEpisodeInfoById),
    takeEvery(ADD_NEW_EPISODE_REQUEST, addNewEpisode)
  ]);
}