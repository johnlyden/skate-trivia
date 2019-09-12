import React from 'react';
import { INITIALIZE_QUIZ, CONTENT_REQUEST, CONTENT_RECEIVED } from './actions';

export const initialState = {
  question: '',
  correctAnswer: '',
  questionId: 0,
  answerOptions: [],
  pointValue: 0,
  timeLimit: 0,
  score: 0,
  loaded: false,
  questionLibrary: null,
  quizContent: null,
  fetching: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CONTENT_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case 'loaded':
      return {
        ...state
      };
    case CONTENT_RECEIVED:
      return {
        ...state,
        quizContent: action.payload,
        fetching: false
      };
    case INITIALIZE_QUIZ:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    case 'answer':
      return {
        ...state,
        score: action.payload.score
      };
    case 'advanceQuiz':
      const { questionLibrary } = state;
      const { nextQuestion } = action.payload;

      return {
        ...state,
        question: questionLibrary[nextQuestion].body,
        answerOptions: questionLibrary[nextQuestion].choices,
        timeLimit: questionLibrary[nextQuestion].timeLimit,
        pointValue: questionLibrary[nextQuestion].pointValue,
        correctAnswer: questionLibrary[nextQuestion].answer,
        questionId: nextQuestion
      };
    default:
      return state;
  }
};

export const Context = React.createContext();
