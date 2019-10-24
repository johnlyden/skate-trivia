import { getTimeLimit, getQuizLength } from '../selectors';

import { initializedQuizStore } from 'utils/testData';

describe('getTimeLimit', () => {
  it('should take an index as an agrument and return the time limit of that question', () => {
    const timeLimit = getTimeLimit(initializedQuizStore, 0);
    expect(timeLimit).toEqual(10);
  });
});

describe('getQuizLength', () => {
  it('should return the length of the quiz', () => {
    const quizLength = getQuizLength(initializedQuizStore);
    expect(quizLength).toEqual(2);
  });
});
