import { ADD_ANIME_REQUEST, ADD_NEW_EPISODE_REQUEST, GET_ANIME_CARDS, GET_ANIME_EPISODES_BYID_REQUEST, GET_ANIME_EPISODESBYCOUNT, GET_ANIME_INFOS_REQUEST, REQUEST_SET_FAVORI_ANIMES, SET_ANIME_DATA, SET_ANIME_EPISODESBYCOUNT, SET_ANIME_EPISODESBYID, SET_ANIME_INFOS, SET_ANIME_INFOS_REQUEST } from "./actionTypes";
import {Anime, AnimeCard, AnimeEpisodes, AnimeInfos} from "../../../types/Anime";

export interface SetAnimeAction {
  type: typeof SET_ANIME_DATA;
  cards: AnimeCard[]
}

export interface updateFavoriAnimes {
  type: typeof REQUEST_SET_FAVORI_ANIMES;
}

export interface setAnimeInfos {
  type: typeof SET_ANIME_INFOS;
  animeInfos: AnimeInfos[]
}

export interface getAnimeData {
  type: typeof GET_ANIME_CARDS;
}

export interface addNewAnime {
  type: typeof ADD_ANIME_REQUEST;
  animeData: Anime
}

export interface setAnimeEpisodesById{
  type: typeof SET_ANIME_EPISODESBYID;
  animeEpisodesById: AnimeEpisodes[]
}

export interface addNewEpisodeRequest{
  type: typeof ADD_NEW_EPISODE_REQUEST;
  animeEpisode: AnimeEpisodes
}

export interface setAnimeEpisodesByCount{
  type: typeof GET_ANIME_EPISODESBYCOUNT,
  count: Number
}

export const setAnimeData = (cards: AnimeCard[]): SetAnimeAction => {
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

export const addNewAnimeAction = (animeData: Anime) : addNewAnime => {
  return{
    type:ADD_ANIME_REQUEST,
    animeData
  }
}

export const getAnimeInfosAction = () =>{
  return{
    type: GET_ANIME_INFOS_REQUEST,
  }
} 

export const setAnimeInfosAction = (animeInfos: AnimeInfos[]): setAnimeInfos =>{
  return{
    type: SET_ANIME_INFOS,
    animeInfos,
    }
}

export const setAnimeEpisodesByIdAction = (animeEpisodesById : AnimeEpisodes[]): setAnimeEpisodesById =>{
  return{
    type: SET_ANIME_EPISODESBYID,
    animeEpisodesById,
  }
}

export const getAnimeEpisodesByIdAction = (id:string) =>{
  return{
    type: GET_ANIME_EPISODES_BYID_REQUEST,
    id,
  }
}

export const addNewEpisodeRequest = (animeEpisode : AnimeEpisodes) : addNewEpisodeRequest =>{
  return{
    type: ADD_NEW_EPISODE_REQUEST,
    animeEpisode
    }
}

export const setAnimeEpisodesByCount = (count : Number) : setAnimeEpisodesByCount =>{
  return{
    type: GET_ANIME_EPISODESBYCOUNT,
    count
  }
}
