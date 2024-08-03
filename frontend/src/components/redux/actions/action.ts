import { GET_HOMEPAGE_ANIMES, SET_HOMEPAGE_ANIMES } from "./actionTypes";
import {Anime} from "../../../types/Anime";


export interface getHomePageAnimes{
  type: typeof GET_HOMEPAGE_ANIMES,
  count: Number
}

export interface SetHomePageAnimes{
  type: typeof SET_HOMEPAGE_ANIMES;
  payload: Anime[];
}

export const getHomePageAnimes = (count: Number): getHomePageAnimes =>{
  return{
    type: GET_HOMEPAGE_ANIMES,
    count,
  }
}




