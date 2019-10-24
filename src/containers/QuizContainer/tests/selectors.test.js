import { getQuestion } from '../selectors';

import { initializedQuizStore } from 'utils/testData';

describe('getQuestion', () => {
  it('should take an index as an agrument and return that question object', () => {
    const question = getQuestion(initializedQuizStore, 0);
    expect(question.body).toEqual("what's 2 + 2?");
  });
});
