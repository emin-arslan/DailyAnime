import { Reducer } from "redux";
import { setAnimeData } from "../actions/action";
import { SET_ANIME_DATA } from "../actions/actionTypes";
import AnimeCardState from "../state/AnimeCardState";

interface IState {
  cards : AnimeCardState[]
}

const initialState: IState = {
  cards: [
    {
      _id:"0",
      title:"sa",
      imageUrl:"sa",
      videoUrl:"asda",
      episode:"askdkd",
      source:"asdasd",
      watchLink:"qwkdkqwdk"
    }
  ],
};


type AnimeCardAction = ReturnType<typeof setAnimeData>;

const animeDataReducer = (
  state = initialState,
  action : {type:string,cards:AnimeCardState[]}
):IState => {
  switch (action.type) {
    
    case SET_ANIME_DATA:
      return {...state,cards:action.cards};
    default:
      return state;
  }
};

export default animeDataReducer;
