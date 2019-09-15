import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Quiz from 'components/Quiz';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { initializeQuiz, updateScore, advanceQuiz } from './actions';

function QuizContainer({ authUser, history, firebase, ...props }) {
  const { store, dispatch } = useContext(Context);
  const { quizContent } = store;
  const { roundId, roundQuestions } = quizContent;

  const quizLength = roundQuestions.length;

  useEffect(() => {
    initializeQuiz(dispatch, roundQuestions);
  }, []);

  function checkAnswer(answerGuess) {
    const { pointValue, score, correctAnswer } = store;

    if (correctAnswer === answerGuess) {
      updateScore(dispatch, score + pointValue);
    }
  }

  function updateQuestion(nextQuestion) {
    setTimeout(() => {
      advanceQuiz(dispatch, nextQuestion);
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

    checkAnswer(answerGuess);

    if (nextQuestion === quizLength) {
      endQuiz();
    } else {
      updateQuestion(nextQuestion);
    }
  }

  if (!store.loaded) return null;
  console.log('store: ', store);
  return <Quiz onAnswerSelected={handleAnswerSelect} questionData={store} />;
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
