import React, { useContext, useEffect, useState } from 'react';
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

import { getQuestion } from './selectors';

function QuizContainer({ authUser, history, firebase, ...props }) {
  const { store, dispatch } = useContext(Context);

  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);

  const { quizContent } = store;
  const { roundId, roundQuestions } = quizContent;
  const quizLength = roundQuestions.length;

  useEffect(() => {
    const firstQuestion = getQuestion(store, index);
    setQuestion(firstQuestion);
  }, []);

  function checkAnswer(answerGuess) {
    const { score } = store;
    const { pointValue, answer } = question;
    let currentScore = score;

    if (answer === answerGuess) {
      currentScore = currentScore + pointValue;
      updateScore(dispatch, currentScore);
    }
    // returning this so can be used to endQuiz with corret score
    // tried pulling score from state to update users total score, but
    // this value was not updated when accessing score from state in endQuiz
    return currentScore;
  }

  function updateQuestion(questionIndex) {
    setTimeout(() => {
      const nextQuestion = getQuestion(store, questionIndex);
      setIndex(questionIndex);
      setQuestion(nextQuestion);
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
    const curRoundScore = checkAnswer(answerGuess);
    const nextQuestionIndex = index + 1;

    if (nextQuestionIndex === quizLength) {
      endQuiz(curRoundScore);
    } else {
      updateQuestion(nextQuestionIndex);
    }
  }

  console.log('question: ', question);

  if (!question) return null;

  return (
    <Quiz
      onAnswerSelected={handleAnswerSelect}
      question={question.body}
      answerOptions={question.choices}
      timeLimit={question.timeLimit}
    />
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
