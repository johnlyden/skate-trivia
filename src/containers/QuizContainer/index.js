import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Quiz from 'components/Quiz';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { updateScore, updateTotalScore } from './actions';

import { getQuestion } from './selectors';

function QuizContainer({ authUser, history, firebase, ...props }) {
  const { store, dispatch } = useContext(Context);
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const { quizContent } = store;
  const { roundId, roundQuestions, roundName } = quizContent;
  const quizLength = roundQuestions.length;

  useEffect(() => {
    const firstQuestion = getQuestion(store, index);
    setQuestion(firstQuestion);
  }, []);

  function checkAnswer(answerGuess) {
    const { pointValue, answer } = question;
    let currentScore = score;

    if (answer === answerGuess) {
      currentScore = currentScore + pointValue;
      setScore(currentScore);
    }
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

  if (!question) return null;

  return (
    // passing too many things - this is everything for the
    <Quiz
      onAnswerSelected={handleAnswerSelect}
      question={question.body}
      answerOptions={question.choices}
      timeLimit={question.timeLimit}
      quizLength={quizLength}
      questionIndex={index}
      roundName={roundName}
      score={score}
    />
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
