export const ADVANCE_QUIZ = 'ADVANCE_QUIZ';
export const END_QUIZ = 'END_QUIZ';
export const SELECTED_CORRECT_ANSWER = 'SELECTED_CORRECT_ANSWER';
export const SELECTED_WRONG_ANSWER = 'SELECTED_WRONG_ANSWER';

export const DELAY = 1500;

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
