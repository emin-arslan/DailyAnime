// reducer.ts

import { RequestStatusInterface } from "../../../types/Anime";
import { SetRequestStatusAction } from "../actions/action";
import { SET_REQUEST_STATUS } from "../actions/actionTypes";

const initialState = {
  isSuccessful: null,
  message: '',
};

const requestStatusReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_REQUEST_STATUS:
      return {
        ...state,
        isSuccessful: action.payload.isSuccessful,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default requestStatusReducer;
