import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Quiz from 'components/Quiz';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import {
  initializeQuiz,
  updateScore,
  advanceQuiz,
  updateTotalScore
} from './actions';

function QuizContainer({ authUser, history, firebase, ...props }) {
  const { store, dispatch } = useContext(Context);
  const { quizContent, question, answerOptions, timeLimit } = store;
  const { roundId, roundQuestions } = quizContent;

  const quizLength = roundQuestions.length;

  useEffect(() => {
    initializeQuiz(dispatch, roundQuestions);
  }, []);

  function checkAnswer(answerGuess) {
    const { pointValue, score, correctAnswer } = store;

    let currentScore = score;

    if (correctAnswer === answerGuess) {
      currentScore = currentScore + pointValue;
      updateScore(dispatch, currentScore);
    }
    // returning this so can be used to endQuiz with corret score
    // tried pulling score from state to update users total score, but
    // this value was not updated when accessing score from state in endQuiz
    return currentScore;
  }

  function updateQuestion(nextQuestion) {
    setTimeout(() => {
      advanceQuiz(dispatch, nextQuestion);
    }, 500);
  }

  function endQuiz(roundScore) {
    const userTotalScore = authUser.score + roundScore;

    const payload = {
      authUser,
      score: roundScore,
      roundId
    };

    return firebase.updateUserProgress(payload, () => {
      updateTotalScore(dispatch, userTotalScore);
      history.push('/home');
    });
    // return firebase.updateLeaderboard();
  }

  function handleAnswerSelect(answerGuess) {
    const { questionId } = store;
    const nextQuestion = questionId + 1;

    const curRoundScore = checkAnswer(answerGuess);

    if (nextQuestion === quizLength) {
      endQuiz(curRoundScore);
    } else {
      updateQuestion(nextQuestion);
    }
  }

  if (!store.loaded) return null;

  return (
    <Quiz
      onAnswerSelected={handleAnswerSelect}
      question={question}
      answerOptions={answerOptions}
      timeLimit={timeLimit}
    />
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
