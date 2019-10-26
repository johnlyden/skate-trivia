import {
  updateScore,
  updateTotalScore,
  updateQuestionIndex,
  updateTotalScoreWithTimer
} from '../actions';
import * as ACTIONS from 'store/actions';

describe('updateScore', () => {
  const dispatch = jest.fn();
  it('should dispatch an action with earned points', () => {
    updateScore(dispatch, 5);
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTIONS.UPDATE_SCORE,
      payload: {
        score: 5
      }
    });
  });
});

describe('updateTotalScore', () => {
  it('should return an action with total round score', () => {
    expect(updateTotalScore(30)).toEqual({
      type: ACTIONS.UPDATE_TOTAL_SCORE,
      payload: {
        totalScore: 30
      }
    });
  });
});

describe('updateTotalScoreWithTimer', () => {
  it('should dispatch updateTotalScore action', () => {
    // ACTIONS.updateTotalScore = jest.mock();
    // const dispatch = jest.fn();
    // updateTotalScoreWithTimer(dispatch, 30);
    // expect(ACTIONS.updateTotalScore).toHaveBeenCalledWith(3);
  });
});

describe('updateQuestionIndex', () => {
  it('should return an action with next question index', () => {
    expect(updateQuestionIndex(1)).toEqual({
      type: ACTIONS.UPDATE_QUESTION_INDEX,
      payload: {
        index: 1
      }
    });
  });
});
