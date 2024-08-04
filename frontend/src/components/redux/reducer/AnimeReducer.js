import { Anime, HomePageAnime } from "../../../types/Anime";
import { SetHomePageAnimes } from "../actions/action";
import { SET_ANIME_INFO, SET_ANIMES, SET_HOMEPAGE_ANIMES } from "../actions/actionTypes";

const initialState = {
  homePageAnimes: [],
  animes: [],
  animeInfo: {}
};

const AnimeReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_HOMEPAGE_ANIMES:
      return {
        ...state,
        homePageAnimes: action.payload,
      };
    case SET_ANIMES:
      return{
        ...state,
        animes: action.payload,
      }
    case SET_ANIME_INFO:
      return{
        ...state,
        animeInfo: action.payload
      }
    default:
      return state;
  }
};

export default AnimeReducer;
