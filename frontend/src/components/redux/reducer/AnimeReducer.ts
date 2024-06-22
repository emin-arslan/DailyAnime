import { SetAnimeAction, updateFavoriAnimes } from "../actions/action";
import { REQUEST_SET_FAVORI_ANIMES, SET_ANIME_DATA } from "../actions/actionTypes";
import { AnimeState, AnimeCard } from "../../../types/Anime";

const storedFavoriAnimes = localStorage.getItem("favoriAnimes");

const initialState: AnimeState = {
  cards: [] as AnimeCard[],
  favoriAnimes: storedFavoriAnimes ? JSON.parse(storedFavoriAnimes) : [],
};

const AnimeReducer = (
  state = initialState,
  action: SetAnimeAction | updateFavoriAnimes
) => {
  switch (action.type) {
    case SET_ANIME_DATA:
      return { ...state, cards: action.cards };
    case REQUEST_SET_FAVORI_ANIMES:
      const storedFavoriAnimes = localStorage.getItem("favoriAnimes");
      return { ...state, favoriAnimes: storedFavoriAnimes ? JSON.parse(storedFavoriAnimes) : [] }
    default:
      return state;
  }
};

export default AnimeReducer;
