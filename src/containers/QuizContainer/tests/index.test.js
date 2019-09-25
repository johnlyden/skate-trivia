import React, { useContext } from 'react';
import { render, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MemoryRouter as Router } from 'react-router-dom';
import { Context, initialState, reducer } from 'store';

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

    it.only('should set the first question', () => {
      const { getByTestId, debug } = renderComponent();
      debug();
    });

    it('should set the first answer choices', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('question-text').textContent).toBe(
        "what is my dog's name?"
      );
    });

    // or
    it('should set the initial state of the quiz', () => {});
  });
});
