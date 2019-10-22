import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import { renderWithStore } from 'utils/testUtils';
import { initializedQuizStore as store } from 'utils/testData';

import * as actions from '../actions';
import QuizContainer from '..';

const dispatch = jest.fn();
const value = { dispatch, store };

const renderComponent = () =>
  renderWithStore(
    <Router>
      <QuizContainer authUser={{}} />
    </Router>,
    value
  );

describe('<QuizContainer />', () => {
  describe('when a quiz starts', () => {
    afterEach(() => {
      cleanup();
    });

    it('should set the first question', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('question-text').innerHTML).toContain("what's 2 + 2?");
    });

    it('should set the first answer choices', () => {
      const { getAllByTestId } = renderComponent();
      expect(getAllByTestId('answer-option')).toHaveLength(4);
    });
  });

  describe('when a user selects the correct answer', () => {
    it('should increase score by the point value', () => {
      actions.updateScore = jest.fn();
      const { getAllByTestId } = renderComponent();
      const correctAnswer = getAllByTestId('answer-option')[3];

      fireEvent.click(correctAnswer.querySelector('input'));

      expect(actions.updateScore).toHaveBeenCalledWith(dispatch, 5);
    });
  });

  describe('when a user selects the wrong answer', () => {
    it('should not update the score', () => {
      actions.updateScore = jest.fn();
      const { getAllByTestId } = renderComponent();
      const correctAnswer = getAllByTestId('answer-option')[2];

      fireEvent.click(correctAnswer.querySelector('input'));

      expect(actions.updateScore).not.toHaveBeenCalled();
    });
  });

  // after answering last question it should end quiz

  // if answering not last qustion, it should advance the quiz
});
