import React from 'react';
import { getQuestion } from '../selectors';

const state = {
  score: 10,
  loaded: true,
  quizContent: {
    roundId: '1234',
    roundQuestions: [
      {
        body: 'whats the next letter? A, B, C...?',
        choices: ['D', 'A', 'F', 'E'],
        timeLimit: 10,
        pointValue: 5
      },
      {
        body: 'whats the meaning of life?',
        choices: ['42', '44', 'idk', 'huh'],
        timeLimit: 10,
        pointValue: 20
      }
    ]
  },
  fetching: false,
  totalScore: null
};

describe('getQuestion', () => {
  it('should take an index as an agrument and return that question object', () => {
    const question = getQuestion(state, 1);
    expect(question.body).toEqual('whats the meaning of life?');
  });
});
