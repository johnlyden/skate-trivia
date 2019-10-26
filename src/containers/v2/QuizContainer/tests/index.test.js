import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { quizContent, QuizContentOneQuestion } from 'utils/testData';
import * as actions from '../actions';

import QuizContainer from '..';

const renderComponent = props => {
  return render(
    <QuizContainer
      onGameOver={jest.fn()}
      quizContent={quizContent}
      {...props}
    />
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

    it('should set the initial score to 0', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('quiz-score').innerHTML).toContain('0 points');
    });

    it('should set the title of the quiz', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('quiz-title').innerHTML).toContain('round 1');
    });

    it('should set the question count correctly', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('question-count').innerHTML).toContain('1 / 2');
    });
  });

  describe('when a user makes a guess', () => {
    it('should increase the score if it was correct', () => {
      const { getAllByTestId, getByText } = renderComponent();
      const correctAnswer = getAllByTestId('answer-option')[3];
      getByText('0 points');
      fireEvent.click(correctAnswer.querySelector('input'));
      getByText('5 points');
    });

    it('should not increase the score if it was incorrect', () => {
      const { getAllByTestId, getByText } = renderComponent();
      const incorrectAnswer = getAllByTestId('answer-option')[0];
      getByText('0 points');
      fireEvent.click(incorrectAnswer.querySelector('input'));
      getByText('0 points');
    });

    it('should advance to the next question if there is one', () => {
      actions.advanceQuiz = jest.fn();
      const { getAllByTestId } = renderComponent();
      const correctAnswer = getAllByTestId('answer-option')[3];
      fireEvent.click(correctAnswer.querySelector('input'));
      expect(actions.advanceQuiz).toHaveBeenCalled();
    });

    it.only('should end the quiz if all questions are answered', () => {
      const onGameOver = jest.fn();
      const { getAllByTestId, debug } = renderComponent({
        quizContent: QuizContentOneQuestion
      });
      debug();
      const correctAnswer = getAllByTestId('answer-option')[3];
      fireEvent.click(correctAnswer.querySelector('input'));
      expect(onGameOver).toHaveBeenCalled();
    });
  });
});
