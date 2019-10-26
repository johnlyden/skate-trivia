import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import { renderWithStore } from 'utils/testUtils';
import {
  initializedQuizStore,
  initializedQuizStoreOneQuestion
} from 'utils/testData';

import * as actions from '../actions';
// TODO: mock a default export here
import firebase from 'components/Firebase';

import QuizContainer from '..';

const dispatch = jest.fn();

const renderComponent = storOverride => {
  let quizStore = storOverride ? storOverride : initializedQuizStore;

  return renderWithStore(
    <Router>
      <QuizContainer authUser={{}} />
    </Router>,
    { dispatch, store: { ...quizStore } }
  );
};
describe('<QuizContainer />', () => {
  afterEach(() => {
    cleanup();
  });
  describe('when a quiz starts', () => {
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

  describe('when a user answers a question', () => {
    it('should advance to the next question if there is one', () => {
      actions.updateQuestionIndexWithTimer = jest.fn();

      const { getAllByTestId } = renderComponent();
      const correctAnswer = getAllByTestId('answer-option')[3];

      fireEvent.click(correctAnswer.querySelector('input'));
      expect(actions.updateQuestionIndexWithTimer).toHaveBeenCalledWith(
        dispatch,
        1
      );
    });
    it.only('should end the quiz if there is not another question', () => {
      actions.updateTotalScoreWithTimer = jest.fn();
      firebase.updateUserProgress = jest.fn();
      const { getAllByTestId } = renderComponent(
        initializedQuizStoreOneQuestion
      );
      const correctAnswer = getAllByTestId('answer-option')[3];
      fireEvent.click(correctAnswer.querySelector('input'));

      expect(actions.updateTotalScoreWithTimer).toHaveBeenCalledWith(dispatch);
    });
  });
});
