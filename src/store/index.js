import React from 'react';
import {
  CONTENT_REQUEST,
  CONTENT_RECEIVED,
  UPDATE_TOTAL_SCORE,
  ADD_VALUES_TO_LEADERBOARD,
} from './actions';

export const initialState = {
  loaded: false,
  quizContent: null,
  archivedRounds: null,
  fetching: false,
  totalScore: null,
  leaderboard: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CONTENT_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case CONTENT_RECEIVED:
      return {
        ...state,
        quizContent: action.payload.quizContent,
        archivedRounds: action.payload.archivedRounds,
        loaded: true,
        fetching: false,
      };
    case UPDATE_TOTAL_SCORE:
      return {
        ...state,
        totalScore: action.payload.totalScore,
      };
    case ADD_VALUES_TO_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload.leaderboard,
      };
    default:
      return state;
  }
};

export const Context = React.createContext();
