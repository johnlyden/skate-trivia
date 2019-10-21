import { initialState } from 'store';

const body = "what's 2 + 2?";
const choices = ['1', '2', '3', '4'];
const pointValue = 5;
const timeLimit = 10;

const quizContent = {
  roundId: '1234',
  roundName: 'round 1',
  roundQuestions: [{ body, choices, timeLimit, pointValue }]
};

const initializedQuizStore = {
  ...initialState,
  loaded: true,
  quizContent
};

export { initializedQuizStore };
