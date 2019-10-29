import { reducer, initialState } from '../reducer';
import {
  ADVANCE_QUIZ,
  END_QUIZ,
  SELECTED_CORRECT_ANSWER,
  SELECTED_WRONG_ANSWER
} from '../actions';

describe('reducer', () => {
  it('should handle SELECTED_CORRECT_ANSWER', () => {
    const result = reducer(initialState, {
      type: SELECTED_CORRECT_ANSWER,
      payload: { pointValue: 5 }
    });
    expect(result).toEqual({
      questionIndex: 0,
      score: 5,
      hasAnswered: true,
      gameOver: false
    });
  });

  it('should handle SELECTED_WRONG_ANSWER', () => {
    const result = reducer(initialState, {
      type: SELECTED_WRONG_ANSWER
    });
    expect(result).toEqual({
      questionIndex: 0,
      score: 0,
      hasAnswered: true,
      gameOver: false
    });
  });

  it('should handle ADVANCE_QUIZ', () => {
    const result = reducer(initialState, {
      type: ADVANCE_QUIZ
    });
    expect(result).toEqual({
      questionIndex: 1,
      score: 0,
      hasAnswered: false,
      gameOver: false
    });
  });

  it('should handle END_QUIZ', () => {
    const result = reducer(initialState, {
      type: END_QUIZ
    });
    expect(result).toEqual({
      questionIndex: 0,
      score: 0,
      hasAnswered: false,
      gameOver: true
    });
  });
});
