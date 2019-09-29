import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Context, initialState } from 'store';

import QuizContainer from '..';

const body = "what's 2 + 2?";
const choices = ['1', '2', '3', '4'];
const pointValue = 5;
const timeLimit = 10;

const quizContent = {
  roundId: '1234',
  roundQuestions: [{ body, choices, timeLimit, pointValue }]
};

const store = { ...initialState, loaded: true, quizContent };
const value = { dispatch: jest.fn(), store };

const renderComponent = () =>
  render(
    <Context.Provider value={value}>
      <Router>
        <QuizContainer authUser={{}} />
      </Router>
    </Context.Provider>
  );

describe('<QuizContainer />', () => {
  describe('when a quiz starts', () => {
    afterEach(() => {
      cleanup();
    });

    it('should set the first question', () => {
      const { getByText } = renderComponent();
      expect(getByText(body)).toBeDefined();
    });

    it('should set the first answer choices', () => {
      const { getAllByTestId } = renderComponent();
      expect(getAllByTestId('answer-option')).toHaveLength(4);
    });

    it('should set the first question time limit', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('timer').innerHTML).toContain('10');
    });

    it('should set the question count to 1', () => {
      const { debug, getByTestId } = renderComponent();
      // get text
      expect(getByTestId('question-count').innerHTML).toEqual('Question 1 / 1');
    });
  });

  // describe('when a quiz ends', () => {
  //   it.x('should submit the final score', () => {
  //     const { getAllByTestId, debug } = renderComponent();
  //     const firstChoice = getAllByTestId('answer-option')[0];
  //     console.log(firstChoice);
  //     fireEvent.click(firstChoice);
  //     debug();
  //     expect(true).toBe(false);
  //   });
  // });
});
