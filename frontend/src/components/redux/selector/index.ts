import { createSelector } from 'reselect';
import { AnimeReducer, HomePageAnime } from '../../../types/Anime';

// State'ten homePageAnimes'i seçer
const homePageAnimesSelector = (state: AnimeReducer) => state.animeReducer;

// homePageAnimes'leri seçmek için selector oluşturur
export const getHomePageAnimesSelector = createSelector(
  [homePageAnimesSelector],
  (state) => state.homePageAnimes
);
