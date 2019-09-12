import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Quiz from 'components/Quiz';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { INITIALIZE_QUIZ } from 'store/actions';

function QuizContainer({
  roundQuestions,
  roundId,
  authUser,
  history,
  firebase,
  ...props
}) {
  const { store, dispatch } = useContext(Context);

  // const roundQuestions = round.fields.questions;
  const quizLength = roundQuestions.length;

  useEffect(() => {
    dispatch({
      type: INITIALIZE_QUIZ,
      payload: {
        question: roundQuestions[0].body,
        answerOptions: roundQuestions[0].choices,
        timeLimit: roundQuestions[0].timeLimit,
        pointValue: roundQuestions[0].pointValue,
        correctAnswer: roundQuestions[0].answer,
        questionLibrary: roundQuestions
      }
    });
  }, []);

  // TODO: move these into an actions folder
  function updateScore(answerGuess) {
    const { pointValue, score, correctAnswer } = store;

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
    const { score } = store;
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
    const { questionId } = store;
    const nextQuestion = questionId + 1;

    updateScore(answerGuess);

    if (nextQuestion === quizLength) {
      endQuiz();
    } else {
      updateQuestion(nextQuestion);
    }
  }

  if (!store.loaded) return null;
  console.log('adfasdfa: ', store);
  return <Quiz onAnswerSelected={handleAnswerSelect} questionData={store} />;
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
