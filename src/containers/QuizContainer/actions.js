import {
  UPDATE_SCORE,
  UPDATE_TOTAL_SCORE,
  UPDATE_QUESTION_INDEX
} from 'store/actions';

import { DELAY } from './index';

export const updateScore = (dispatch, earnedPoints) =>
  dispatch({
    type: UPDATE_SCORE,
    payload: {
      score: earnedPoints
    }
  });

export const updateTotalScore = score => {
  return {
    type: UPDATE_TOTAL_SCORE,
    payload: {
      totalScore: score
    }
  };
};

export const updateQuestionIndex = index => {
  return {
    type: UPDATE_QUESTION_INDEX,
    payload: {
      index
    }
  };
  // dispatch({
  //   type: UPDATE_QUESTION_INDEX,
  //   payload: {
  //     index
  //   }
  // });
};

export const updateQuestionIndexWithTimer = (dispatch, index) => {
  setTimeout(() => {
    dispatch(updateQuestionIndex(index));
  }, DELAY);
};

export const updateTotalScoreWithTimer = (dispatch, score) => {
  setTimeout(() => {
    dispatch(updateTotalScore(score));
  }, DELAY);
};
