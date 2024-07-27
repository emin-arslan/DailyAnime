import { createSelector } from 'reselect';
import { IState } from '../../../types/Anime';

// State'den izlenen animeleri seçer
const selectAnimes = (state: IState) => state.animeReducer;

// Kullanışlı selectorler oluşturmak için reselect kütüphanesini kullanabiliriz
export const getAnimeCards = createSelector(
  [selectAnimes],
  (animeState) => animeState.cards
);

export const getFavoriAnimes = createSelector(
  [selectAnimes],
  (animeState) => animeState.favoriAnimes
);

export const getAnimeInfosSelector = createSelector(
  [selectAnimes],
  (animeState) => animeState.animeInfos
);

export const getEpisodesInfosById = createSelector(
  [selectAnimes],
  (animeState) => animeState.animeEpisodesById
)

export const getEpisodesByCount = createSelector(
  [selectAnimes],
  (animeState) => animeState.animeEpisodesById
)

