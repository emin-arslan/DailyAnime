import { Anime, HomePageAnime } from "../../../types/Anime";
import { SetHomePageAnimes } from "../actions/action";
import { SET_HOMEPAGE_ANIMES } from "../actions/actionTypes";

const initialState: HomePageAnime = {
  homePageAnimes: [] as Anime[],
};

const AnimeReducer = (
  state = initialState,
  action: SetHomePageAnimes
) => {
  switch (action.type) {
    case SET_HOMEPAGE_ANIMES:
      return {
        ...state,
        homePageAnimes: action.payload,
      };
    default:
      return state;
  }
};

export default AnimeReducer;
