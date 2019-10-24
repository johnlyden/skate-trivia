import { updateScore, updateTotalScore, updateQuestionIndex } from '../actions';
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
  const dispatch = jest.fn();
  it('should dispatch an action with total round score', () => {
    updateTotalScore(dispatch, 30);
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTIONS.UPDATE_TOTAL_SCORE,
      payload: {
        totalScore: 30
      }
    });
  });
});

describe('updateQuestionIndex', () => {
  const dispatch = jest.fn();
  it('should dispatch an action with next question index', () => {
    updateQuestionIndex(dispatch, 1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTIONS.UPDATE_QUESTION_INDEX,
      payload: {
        index: 1
      }
    });
  });
});
