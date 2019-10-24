import {
  UPDATE_SCORE,
  UPDATE_TOTAL_SCORE,
  UPDATE_QUESTION_INDEX
} from 'store/actions';

export const updateScore = (dispatch, earnedPoints) =>
  dispatch({
    type: UPDATE_SCORE,
    payload: {
      score: earnedPoints
    }
  });

export const updateTotalScore = (dispatch, score) => {
  dispatch({
    type: UPDATE_TOTAL_SCORE,
    payload: {
      totalScore: score
    }
  });
};

export const updateQuestionIndex = (dispatch, index) => {
  dispatch({
    type: UPDATE_QUESTION_INDEX,
    payload: {
      index
    }
  });
};
