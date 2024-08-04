import { createSelector } from 'reselect';
import { AnimeReducer, HomePageAnime, RequestStatusReducer } from '../../../types/Anime';

// State'ten homePageAnimes'i seçer
const homePageAnimesSelector = (state) => state.animeReducer;
const requestStatus = (state) => state.RequestStatus;

// homePageAnimes'leri seçmek için selector oluşturur
export const getHomePageAnimesSelector = createSelector(
  [homePageAnimesSelector],
  (state) => state.homePageAnimes
);

export const getRequestStatus = createSelector(
  [requestStatus],
  (state) => state
)

export const getAnimes = createSelector(
  [homePageAnimesSelector],
  (state) => state.animes
)

export const searchAnime = createSelector(
  [homePageAnimesSelector],
  (state) => state.animeInfo
)
