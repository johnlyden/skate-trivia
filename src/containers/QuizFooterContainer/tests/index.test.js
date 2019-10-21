import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithStore } from 'utils/testUtils';
import { initializedQuizStore as store } from 'utils/testData';

import { QuizFooterContainer } from '..';

const value = { dispatch: jest.fn(), store };
const renderComponent = () => renderWithStore(<QuizFooterContainer />, value);

describe('<QuizFooterContainer />', () => {
  describe('when a quiz starts', () => {
    afterEach(() => {
      cleanup();
    });

    it('should set the first question time limit', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('timer').innerHTML).toContain('10');
    });

    it('should set the question count to 1', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('question-count').innerHTML).toEqual('Question 1 / 1');
    });
  });
});
