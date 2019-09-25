import React from 'react';
import {
  INITIALIZE_QUIZ,
  CONTENT_REQUEST,
  CONTENT_RECEIVED,
  UPDATE_SCORE,
  ADVANCE_QUIZ,
  UPDATE_TOTAL_SCORE
} from './actions';

export const initialState = {
  // question: '',
  // correctAnswer: '',
  // questionId: 0,
  // answerOptions: [],
  // pointValue: 0,
  // timeLimit: 0,
  score: 0,
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
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.payload.score
      };
    case UPDATE_TOTAL_SCORE:
      return {
        ...state,
        totalScore: action.payload.totalScore
      };
    case ADVANCE_QUIZ:
      const { quizContent } = state;
      const { roundQuestions } = quizContent;

      const { nextQuestion } = action.payload;

      return {
        ...state,
        question: roundQuestions[nextQuestion].body,
        answerOptions: roundQuestions[nextQuestion].choices,
        timeLimit: roundQuestions[nextQuestion].timeLimit,
        pointValue: roundQuestions[nextQuestion].pointValue,
        correctAnswer: roundQuestions[nextQuestion].answer,
        questionId: nextQuestion
      };
    default:
      return state;
  }
};

export const Context = React.createContext();
