import { wait } from '@testing-library/react';

import {
  ADVANCE_QUIZ,
  END_QUIZ,
  SELECTED_CORRECT_ANSWER,
  SELECTED_WRONG_ANSWER,
  selectedCorrectAnswer,
  selectedWrongAnswer,
  advanceQuizWithDelay,
  endQuizWithDelay
} from '../actions';

describe('selectedCorrectAnswer', () => {
  const dispatch = jest.fn();
  const payload = { foo: 'bar' };
  it('should dispatch the correct answer action', () => {
    selectedCorrectAnswer(dispatch, payload);
    expect(dispatch).toHaveBeenCalledWith({
      type: SELECTED_CORRECT_ANSWER,
      payload
    });
  });
});

describe('selectedWrongAnswer', () => {
  const dispatch = jest.fn();
  it('should dispatch the wrong answer action', () => {
    selectedWrongAnswer(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: SELECTED_WRONG_ANSWER
    });
  });
});

describe('advanceQuizWithDelay', () => {
  const dispatch = jest.fn();
  it('should dispatch the advance quiz action', async () => {
    advanceQuizWithDelay(dispatch);
    await wait(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: ADVANCE_QUIZ
      })
    );
  });
});

describe('endQuizWithDelay', () => {
  const dispatch = jest.fn();
  it('should dispatch the end quiz action', async () => {
    endQuizWithDelay(dispatch);
    await wait(() =>
      expect(dispatch).toHaveBeenCalledWith({
        type: END_QUIZ
      })
    );
  });
});
