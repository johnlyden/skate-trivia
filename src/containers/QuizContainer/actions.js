import {
  INITIALIZE_QUIZ,
  UPDATE_SCORE,
  ADVANCE_QUIZ,
  UPDATE_TOTAL_SCORE,
  UPDATE_QUESTION_INDEX
} from 'store/actions';

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

export const updateTotalScore = (dispatch, score) => {
  dispatch({
    type: UPDATE_TOTAL_SCORE,
    payload: {
      totalScore: score
    }
  });
};

export const updateQuestionIndex = (dispatch, index) => {
  dispatch({
    type: UPDATE_QUESTION_INDEX,
    payload: {
      index
    }
  });
};
