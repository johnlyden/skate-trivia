import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Context } from 'store';
import { withFirebase } from 'components/Firebase';
import { QuizHeaderContainer as QuizHeader } from 'containers/QuizHeaderContainer';
import { QuizFooterContainer as QuizFooter } from 'containers/QuizFooterContainer';
import { QuizContainer as Quiz } from 'containers/QuizContainer';

import {
  updateScore,
  updateTotalScore,
  updateQuestionIndex
} from '../QuizContainer/actions';

import { getQuestion } from './selectors';

function QuizPageContainer({ authUser, history, firebase }) {
  const { store, dispatch } = useContext(Context);

  const { quizContent, score } = store;
  const { roundId, roundQuestions, roundName } = quizContent;
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const quizLength = roundQuestions.length;

  useEffect(() => {
    const firstQuestion = getQuestion(store, questionIndex);
    setQuestion(firstQuestion);
  }, []);

  function isLastQuestion() {
    return questionIndex + 1 === quizLength;
  }

  function endQuiz() {
    const userTotalScore = authUser.score + score;

    const payload = {
      authUser,
      score,
      roundId
    };

    return firebase.updateUserProgress(payload, () => {
      updateTotalScore(dispatch, userTotalScore);
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    });
    // return firebase.updateLeaderboard();
  }

  function checkAnswer(answerGuess) {
    const { pointValue, answer } = question;
    let currentScore = score;

    if (answer === answerGuess) {
      currentScore = currentScore + pointValue;
      updateScore(dispatch, currentScore);
    }
    return currentScore;
  }

  // sets the question after 500ms
  function updateQuestion() {
    const nextIndex = questionIndex + 1;
    setTimeout(() => {
      setQuestionIndex(nextIndex);
      const nextQuestion = getQuestion(store, nextIndex);
      setQuestion(nextQuestion);
      setTimeIsUp(false);
    }, 500);
  }

  // select answer
  function handleAnswerSelect(answerGuess) {
    if (timeIsUp) {
      return false;
    }

    const curRoundScore = checkAnswer(answerGuess);
    const quizIsOver = isLastQuestion();

    if (quizIsOver) {
      endQuiz(curRoundScore);
    } else {
      updateQuestion();
    }
  }

  // disables answers
  function handleTimeUp() {
    setTimeIsUp(true);

    // advance the quiz after 500ms
    if (questionIndex === quizLength - 1) {
      endQuiz(20);
    } else {
      updateQuestion();
    }
  }

  if (!question) {
    return null;
  }

  return (
    <>
      <QuizHeader title={roundName} score={score} />
      <Quiz question={question} onAnswerSelected={handleAnswerSelect} />
      <QuizFooter
        currentQuestionIdx={questionIndex}
        totalQuestions={quizLength}
        handleTimeUp={handleTimeUp} // do the things that happen when times up
      />
    </>
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizPageContainer);
