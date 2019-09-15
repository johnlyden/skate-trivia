import { INITIALIZE_QUIZ, UPDATE_SCORE, ADVANCE_QUIZ } from 'store/actions';

export const initializeQuiz = (dispatch, roundQuestions) => {
  return dispatch({
    type: INITIALIZE_QUIZ,
    payload: {
      question: roundQuestions[0].body,
      answerOptions: roundQuestions[0].choices,
      timeLimit: roundQuestions[0].timeLimit,
      pointValue: roundQuestions[0].pointValue,
      correctAnswer: roundQuestions[0].answer
    }
  });
};

export const updateScore = (dispatch, earnedPoints) =>
  dispatch({
    type: UPDATE_SCORE,
    payload: {
      score: earnedPoints
    }
  });

export const advanceQuiz = (dispatch, nextQuestion) => {
  dispatch({
    type: ADVANCE_QUIZ,
    payload: {
      nextQuestion
    }
  });
};
