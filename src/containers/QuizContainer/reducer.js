import {
  ADVANCE_QUIZ,
  END_QUIZ,
  SELECTED_CORRECT_ANSWER,
  SELECTED_WRONG_ANSWER
} from './actions';

export const initialState = {
  questionIndex: 0,
  score: 0,
  hasAnswered: false,
  gameOver: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SELECTED_CORRECT_ANSWER:
      return {
        ...state,
        score: state.score + action.payload.pointValue,
        hasAnswered: true
      };
    case SELECTED_WRONG_ANSWER:
      return {
        ...state,
        hasAnswered: true
      };
    case ADVANCE_QUIZ:
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        hasAnswered: false
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
