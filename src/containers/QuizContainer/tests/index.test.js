import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import { round } from './data';

import QuizContainer from '..';

const renderComponent = () =>
  render(
    <Router>
      <QuizContainer round={round} />
    </Router>
  );

describe('<QuizContainer />', () => {
  describe('when a quiz starts', () => {
    afterEach(() => {
      cleanup();
    });

    it('renders a Quiz', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('quiz')).toBeDefined();
    });

    it('loads the first question of the round', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('question-text').textContent).toBe(
        "what is my dog's name?"
      );
    });
  });
});
