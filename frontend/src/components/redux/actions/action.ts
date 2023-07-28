import { Action } from "redux";
import { SET_ANIME_DATA, GET_ANIME_CARDS } from "./actionTypes";
import AnimeCardState from "../state/AnimeCardState";



export interface GetAnimeCardsAction extends Action<typeof GET_ANIME_CARDS> {}

export interface SetAnimeDataAction {
  type: typeof SET_ANIME_DATA;
  cards: AnimeCardState[]
}

export const getAnimeCards = () => ({
  type: "ssd",
});

export const setAnimeData = (cards: AnimeCardState[]): SetAnimeDataAction => {
  return {
    type: SET_ANIME_DATA,
    cards,
  };
};