import { GET_ANIME_CARDS, REQUEST_SET_FAVORI_ANIMES, SET_ANIME_DATA, SET_WATCHED_ANIMES } from "./actionTypes";
import {animeCard} from "../../../types/Anime";

export interface SetAnimeAction {
  type: typeof SET_ANIME_DATA;
  cards: animeCard[]
}

export interface updateFavoriAnimes {
  type: typeof REQUEST_SET_FAVORI_ANIMES;
}

export interface updateWatchedAnimes {
  type: typeof SET_WATCHED_ANIMES;
}

export interface getAnimeData {
  type: typeof GET_ANIME_CARDS;
}


export const setAnimeData = (cards: animeCard[]): SetAnimeAction => {
  return {
    type: SET_ANIME_DATA,
    cards,
  };
};


export const setFavoriAnimes = () : updateFavoriAnimes =>{
  return{
    type:REQUEST_SET_FAVORI_ANIMES
  }
}

export const getAnimeDatas = () : getAnimeData => {
  return{
    type:GET_ANIME_CARDS
  }
}

export const setWatchedAnimes = () : updateWatchedAnimes =>{
  return{
    type:SET_WATCHED_ANIMES
  }
}