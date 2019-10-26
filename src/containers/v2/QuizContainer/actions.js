import React from 'react';

const ADVANCE_QUIZ = 'ADVANCE_QUIZ';
const END_QUIZ = 'END_QUIZ';
const SELECT_ANSWER = 'SELECT_ANSWER';
const TIME_UP = 'TIME_UP';

export const initialState = {
  questionIndex: 0,
  questionNumber: 1,
  score: 0,
  hasAnswered: false,
  gameOver: false,
  shouldAdvance: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_ANSWER:
      return {
        ...state,
        hasAnswered: true,
        questionIndex: state.questionIndex + 1
      };
    case TIME_UP:
      return {
        ...state,
        hasAnswered: true,
        questionIndex: state.questionIndex + 1
      };
    case ADVANCE_QUIZ:
      // const { questionNumber } = action.payload;
      return {
        ...state,
        questionNumber: state.questionIndex + 1,
        hasAnswered: false,
        shouldAdvance: true
      };
    case END_QUIZ:
      return {
        ...state,
        gameOver: true
      };
    default:
      return state;
  }
};

export const showTimeIsUp = dispatch => {
  dispatch({
    type: TIME_UP
  });
};

export const selectAnswer = dispatch => {
  dispatch({
    type: SELECT_ANSWER
  });
};

export const requestSetQuestionWithDelay = dispatch => {
  return setTimeout(() => {
    dispatch({
      type: ADVANCE_QUIZ
    });
  }, 1500);
};
export const requestAdvanceQuiz = (dispatch, { questionNumber }) => {
  return setTimeout(() => {
    dispatch({
      type: ADVANCE_QUIZ,
      payload: { questionNumber }
    });
  }, 1500);
};

export const requestEndQuiz = dispatch => {
  setTimeout(() => {
    dispatch({
      type: END_QUIZ
    });
  }, 1500);
};
