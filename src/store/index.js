import React from 'react';
import {
  CONTENT_REQUEST,
  CONTENT_RECEIVED,
  UPDATE_SCORE,
  UPDATE_TOTAL_SCORE,
  UPDATE_QUESTION_INDEX
} from './actions';

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
    // case UPDATE_SCORE:
    //   return {
    //     ...state,
    //     score: action.payload.score
    //   };
    case UPDATE_TOTAL_SCORE:
      console.log('updating total score: ', action.payload.totalScore);
      return {
        ...state,
        totalScore: action.payload.totalScore
      };
    // case UPDATE_QUESTION_INDEX:
    //   return {
    //     ...state,
    //     questionIndex: action.payload.index
    //   };
    default:
      return state;
  }
};

export const Context = React.createContext();
