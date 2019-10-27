const ADVANCE_QUIZ = 'ADVANCE_QUIZ';
const END_QUIZ = 'END_QUIZ';
const SELECTED_CORRECT_ANSWER = 'SELECTED_CORRECT_ANSWER';
const SELECTED_WRONG_ANSWER = 'SELECTED_WRONG_ANSWER';

export const DELAY = 1500;

export const initialState = {
  questionIndex: 0,
  score: 0,
  hasAnswered: false,
  gameOver: false,
  shouldAdvance: false
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

export const selectedCorrectAnswer = (dispatch, payload) => {
  dispatch({
    type: SELECTED_CORRECT_ANSWER,
    payload
  });
};

export const selectedWrongAnswer = dispatch => {
  dispatch({
    type: SELECTED_WRONG_ANSWER
  });
};

export const advanceQuizWithDelay = dispatch => {
  setTimeout(() => {
    dispatch({
      type: ADVANCE_QUIZ
    });
  }, DELAY);
};

export const endQuizWithDelay = dispatch => {
  setTimeout(() => {
    dispatch({
      type: END_QUIZ
    });
  }, DELAY);
};
