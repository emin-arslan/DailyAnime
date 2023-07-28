import { combineReducers } from "@reduxjs/toolkit";
import animeDataReducer from "../reducer/AnimeData"

const rootReducer = combineReducers({
    animeDataReducer
});

export default rootReducer;