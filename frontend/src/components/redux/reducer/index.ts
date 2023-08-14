import { combineReducers } from "@reduxjs/toolkit";
import animeReducer from "./AnimeReducer"

const rootReducer = combineReducers({
    animeReducer
});

export default rootReducer;