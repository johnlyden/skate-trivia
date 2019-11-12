import React from "react";
import {
  CONTENT_REQUEST,
  CONTENT_RECEIVED,
  UPDATE_TOTAL_SCORE
} from "./actions";

export const initialState = {
  loaded: false,
  quizContent: null,
  fetching: false,
  totalScore: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CONTENT_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case CONTENT_RECEIVED:
      return {
        ...state,
        quizContent: action.payload,
        loaded: true,
        fetching: false
      };
    case UPDATE_TOTAL_SCORE:
      return {
        ...state,
        totalScore: action.payload.totalScore
      };
    default:
      return state;
  }
};

export const Context = React.createContext();
