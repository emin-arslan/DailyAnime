import { createSelector } from 'reselect';
import { IState } from '../../../types/Anime';

// State'den izlenen animeleri seçer
const selectAnimes = (state: IState) => state.animeReducer;

// Kullanışlı selectorler oluşturmak için reselect kütüphanesini kullanabiliriz
export const getAnimeCards = createSelector(
  [selectAnimes],
  (animes) => animes.cards
);

export const getFavoriAnimes = createSelector(
  [selectAnimes],
  (animes) => animes.favoriAnimes
);

export const getWatchedAnimes = createSelector(
  [selectAnimes],
  (animes) => animes.watchedAnimes
);
