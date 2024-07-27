import { setAnimeInfos, SetAnimeAction, updateFavoriAnimes, setAnimeEpisodesById } from "../actions/action";
import { GET_ANIME_INFOS_REQUEST, REQUEST_SET_FAVORI_ANIMES, SET_ANIME_DATA, SET_ANIME_EPISODESBYID, SET_ANIME_INFOS, SET_ANIME_INFOS_REQUEST } from "../actions/actionTypes";
import { AnimeState, AnimeCard, AnimeInfos, AnimeEpisodes } from "../../../types/Anime";

const storedFavoriAnimes = localStorage.getItem("favoriAnimes");

const initialState: AnimeState = {
  cards: [] as AnimeCard[],
  favoriAnimes: storedFavoriAnimes ? JSON.parse(storedFavoriAnimes) : [],
  animeInfos: [] as AnimeInfos[],
  animeEpisodesById: [] as AnimeEpisodes[],
};

const AnimeReducer = (
  state = initialState,
  action: SetAnimeAction | updateFavoriAnimes | setAnimeInfos | setAnimeEpisodesById
) => {
  switch (action.type) {
    case SET_ANIME_DATA:
      return { ...state, cards: action.cards };
    case REQUEST_SET_FAVORI_ANIMES:
      const storedFavoriAnimes = localStorage.getItem("favoriAnimes");
      return { ...state, favoriAnimes: storedFavoriAnimes ? JSON.parse(storedFavoriAnimes) : [] }
    case SET_ANIME_INFOS:
      console.log("reducer",action.animeInfos)
      return { ...state, animeInfos: action.animeInfos };
    case SET_ANIME_EPISODESBYID:
      console.log(action,"red");
      return {...state, animeEpisodesById: action.animeEpisodesById}
    default:
      return state;
  }
};

export default AnimeReducer;
