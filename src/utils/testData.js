import { initialState } from 'store';

const body = "what's 2 + 2?";
const choices = ['1', '2', '3', '4'];
const pointValue = 5;
const timeLimit = 10;
const answer = '4';

const body1 = 'finish the sequence: a..b..c...';
const choices1 = ['d', 'e', 'f', 'g'];
const pointValue1 = 10;
const timeLimit1 = 20;
const answer1 = 'd';

const quizContent = {
  roundId: '1234',
  roundName: 'round 1',
  roundQuestions: [
    { body, choices, answer, timeLimit, pointValue },
    { body1, choices1, answer1, timeLimit1, pointValue1 }
  ]
};

const QuizContentOneQuestion = {
  roundId: '1234',
  roundName: 'round 1',
  roundQuestions: [{ body, choices, answer, timeLimit, pointValue }]
};

export const initializedQuizStore = {
  ...initialState,
  loaded: true,
  quizContent
};

export const initializedQuizStoreOneQuestion = {
  ...initialState,
  loaded: true,
  quizContent: QuizContentOneQuestion
};
