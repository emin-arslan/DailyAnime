import { ADD_NEW_ANIME_REQUEST, ADD_NEW_EPISODE_REQUEST, GET_ANIME_REQUEST, GET_ANIMES, GET_HOMEPAGE_ANIMES, GET_REQUEST_STATUS, SET_HOMEPAGE_ANIMES, SET_REQUEST_STATUS, UPDATE_ANIME_REQUEST, UPDATE_EPISODE_REQUEST } from "./actionTypes";
import {Anime, RequestStatusInterface} from "../../../types/Anime";


export const getHomePageAnimesAction = (count) =>{
  return{
    type: GET_HOMEPAGE_ANIMES,
    count,
  }
}

export const addNewAnimeRequestAction = (anime) =>{
  console.log(anime);
  return{
    type: ADD_NEW_ANIME_REQUEST,
    payload: anime
    }
}

export const getRequestStatus = (status)=> ({
  type: GET_REQUEST_STATUS,
  payload: status,
});

export const getAnimes = () =>{
  return{
    type:GET_ANIMES
  }
}

export const addNewEpisodeRequestAction = (payload) =>{
  return{
    type: ADD_NEW_EPISODE_REQUEST,
    payload,
    }
}

export const updateEpisdeAction = (payload) => {
  return {
    type: UPDATE_EPISODE_REQUEST,
    payload,
    }
}

export const updateAnime = (payload) =>{
  return{
    type: UPDATE_ANIME_REQUEST,
    payload,
    }
}

export const getAnimeAction = (payload) =>{
  return{
    type: GET_ANIME_REQUEST,
    payload,
  }
}

