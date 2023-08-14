import { SetAnimeAction, updateFavoriAnimes, updateWatchedAnimes } from "../actions/action";
import { REQUEST_SET_FAVORI_ANIMES, SET_ANIME_DATA, SET_WATCHED_ANIMES } from "../actions/actionTypes";
import { AnimeState, animeCard } from "../../../types/Anime";

const storedFavoriAnimes = localStorage.getItem("favoriAnimes");
const watchedAnimes = localStorage.getItem("watchedAnimes");

const initialState: AnimeState = {
  cards: [] as animeCard[],
  favoriAnimes: storedFavoriAnimes ? JSON.parse(storedFavoriAnimes) : [],
  watchedAnimes: watchedAnimes ? JSON.parse(watchedAnimes) : [],
};

const AnimeReducer = (
  state = initialState,
  action: SetAnimeAction | updateFavoriAnimes | updateWatchedAnimes
) => {
  switch (action.type) {
    case SET_ANIME_DATA:
      return { ...state, cards: action.cards };
    case REQUEST_SET_FAVORI_ANIMES:
      const storedFavoriAnimes = localStorage.getItem("favoriAnimes");
      return { ...state, favoriAnimes: storedFavoriAnimes ? JSON.parse(storedFavoriAnimes) : [] }
    case SET_WATCHED_ANIMES:
      const watchedAnimes = localStorage.getItem("watchedAnimes");
      return { ...state, favoriAnimes: watchedAnimes ? JSON.parse(watchedAnimes) : [] }
    default:
      return state;
  }
};

export default AnimeReducer;
