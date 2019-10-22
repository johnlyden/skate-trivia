import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithStore } from 'utils/testUtils';
import { initializedQuizStore as store } from 'utils/testData';
import { QuizHeaderContainer } from '..';

const value = { dispatch: jest.fn(), store };

const renderComponent = () => renderWithStore(<QuizHeaderContainer />, value);

describe('<QuizHeaderContainer />', () => {
  describe('when a quiz starts', () => {
    afterEach(() => {
      cleanup();
    });

    it('should set the quiz round in the title', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('quiz-title').innerHTML).toContain('round 1');
    });

    it('should initialize the score to 0 ', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('quiz-score').innerHTML).toEqual('0 points');
    });
  });
});
