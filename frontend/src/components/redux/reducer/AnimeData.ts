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
      title:"sa",
      imageUrl:"sa",
      videoUrl:"asda",
      episode:"askdkd",
      source:"asdasd"
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
      console.log("asdasdasd")
      return {...state,cards:action.cards};
    default:
      return state;
  }
};

export default animeDataReducer;
