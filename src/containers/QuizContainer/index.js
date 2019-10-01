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
  const [answered, setAnswered] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

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

  useEffect(() => {
    if (question) {
      const time = Number(Number(question.timeLimit) * 1000);
      const timer = setTimeout(() => {
        // setIsDone(true);
        setAnswered(true);
        updateQuestion(index + 1);
      }, time + 1);
      const timer1 = setTimeout(() => {
        setTimeIsUp(true);
        setAnswered(true);
      }, time);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer);
      };
    }
  }, [question]);

  function updateQuestion(questionIndex) {
    setTimeout(() => {
      const nextQuestion = getQuestion(store, questionIndex);
      setIndex(questionIndex);
      setQuestion(nextQuestion);
      setAnswered(false);
      setTimeIsUp(false);
    }, 1500);
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
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    });
    // return firebase.updateLeaderboard();
  }

  function handleAnswerSelect(answerGuess) {
    if (timeIsUp) {
      return false;
    }
    const curRoundScore = checkAnswer(answerGuess);
    const nextQuestionIndex = index + 1;
    setAnswered(true);

    if (nextQuestionIndex === quizLength) {
      endQuiz(curRoundScore);
    } else {
      updateQuestion(nextQuestionIndex);
    }
  }

  if (!question) return null;
  const { answer } = question;
  return (
    // passing too many things - this is everything for the
    <Quiz
      answer={answer}
      answered={answered}
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
