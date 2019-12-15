import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithStore as render } from 'utils/testUtils';
import { quizContent } from 'utils/testData';
import { mockFirebase as firebase } from 'utils/testUtils';
import { initialState } from 'store';
import { QuizPageBase as QuizPageContainer, determineRank } from '../';

describe('QuizPageContainer', () => {
  it('should render loading state when there is no content', () => {
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <Router>
        <QuizPageContainer firebase={firebase} />
      </Router>,
      { dispatch, store: initialState },
    );
    expect(getByTestId('loading')).toBeDefined();
  });

  it('should render the quiz when there is content', () => {
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <Router>
        <QuizPageContainer firebase={firebase} />
      </Router>,
      { dispatch, store: { ...initialState, quizContent } },
    );
    expect(getByTestId('quiz-body')).toBeDefined();
  });
});

describe('determineRank', () => {
  const nums = [10, 20, 30, 40];
  it('should return 4 when its the highest number', () => {
    expect(determineRank(nums, 60)).toBe(4);
  });

  it('should return 0 when its the lowest number', () => {
    expect(determineRank(nums, 5)).toBe(0);
  });

  it('should return a 1 when its 15', () => {
    expect(determineRank(nums, 15)).toBe(1);
  });

  it('should return a 2 when its 25', () => {
    expect(determineRank(nums, 25)).toBe(2);
  });

  it('should return one lowest than the highest when its same as highest', () => {
    expect(determineRank(nums, 40)).toBe(3);
  });
});
