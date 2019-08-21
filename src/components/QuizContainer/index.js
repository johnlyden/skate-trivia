import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import Quiz from 'components/Quiz';
import { compose } from 'recompose';

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    case 'answer':
      return {
        ...state,
        score: action.payload.score
      };
    case 'advanceQuiz':
      const { questionLibrary } = state;
      const { nextQuestion } = action.payload;

      return {
        ...state,
        question: questionLibrary[nextQuestion].fields.body,
        answerOptions: questionLibrary[nextQuestion].fields.choices,
        timeLimit: questionLibrary[nextQuestion].fields.timeLimit,
        pointValue: questionLibrary[nextQuestion].fields.pointValue,
        correctAnswer: questionLibrary[nextQuestion].fields.answer,
        questionId: nextQuestion
      };
    default:
      return state;
  }
}

const initialState = {
  question: '',
  correctAnswer: '',
  questionId: 0,
  answerOptions: [],
  pointValue: 0,
  timeLimit: 0,
  score: 0,
  loaded: false,
  questionLibrary: null
};

function QuizContainer({ round, authUser, history, firebase, ...props }) {
  const [quizState, dispatch] = useReducer(reducer, initialState);
  const quizQuestions = round.fields.questions;
  const quizLength = quizQuestions.length;
  const roundId = round.sys.id;

  console.log(round);

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: {
        question: quizQuestions[0].fields.body,
        answerOptions: quizQuestions[0].fields.choices,
        timeLimit: quizQuestions[0].fields.timeLimit,
        pointValue: quizQuestions[0].fields.pointValue,
        correctAnswer: quizQuestions[0].fields.answer,
        questionLibrary: quizQuestions
      }
    });
  }, [round]);

  function updateScore(answerGuess) {
    const { pointValue, score, correctAnswer } = quizState;

    let earnedPoints = 0;

    if (correctAnswer === answerGuess) {
      earnedPoints = score + pointValue;
    }

    dispatch({
      type: 'answer',
      payload: {
        score: earnedPoints
      }
    });
  }

  function updateQuestion(nextQuestion) {
    setTimeout(() => {
      dispatch({
        type: 'advanceQuiz',
        payload: {
          nextQuestion
        }
      });
    }, 500);
  }

  function endQuiz() {
    console.log(authUser);
    const { score } = quizState;
    const payload = {
      authUser,
      score,
      roundId
    };
    return firebase.updateUserProgress(payload, () => {
      history.push('/home');
    });
    // return firebase.updateLeaderboard();
  }

  function handleAnswerSelect(answerGuess) {
    const { questionId } = quizState;
    const nextQuestion = questionId + 1;

    updateScore(answerGuess);

    if (nextQuestion === quizLength) {
      endQuiz();
    } else {
      updateQuestion(nextQuestion);
    }
  }

  if (!quizState.loaded) return null;

  return (
    <Quiz onAnswerSelected={handleAnswerSelect} questionData={quizState} />
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
