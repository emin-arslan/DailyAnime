import { combineReducers } from "@reduxjs/toolkit";
import animeReducer from "./AnimeReducer"
import RequestStatus from "./RequestStatus";

const rootReducer = combineReducers({
    animeReducer,
    RequestStatus
});

export default rootReducer;