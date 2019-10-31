import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithStore as render } from 'utils/testUtils';
import { quizContent } from 'utils/testData';

import { initialState } from 'store';
import QuizPageContainer from '../';

describe('QuizPageContainer', () => {
  it('should render loading state when there is no content', () => {
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <Router>
        <QuizPageContainer />
      </Router>,
      { dispatch, store: initialState }
    );
    expect(getByTestId('loading')).toBeDefined();
  });

  it('should render the quiz when there is content', () => {
    const dispatch = jest.fn();
    const { getByTestId } = render(
      <Router>
        <QuizPageContainer />
      </Router>,
      { dispatch, store: { ...initialState, quizContent } }
    );
    expect(getByTestId('quiz-container')).toBeDefined();
  });
});
