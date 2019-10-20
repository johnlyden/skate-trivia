import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Context } from 'store';
import { useTimer } from 'hooks/useTimer';
import { updateScore, updateTotalScore, updateQuestionIndex } from './actions';
import { getQuestion } from './selectors';
import { withFirebase } from 'components/Firebase';
import Quiz from 'components/Quiz';

function QuizContainer({ authUser, history, firebase }) {
  const { store, dispatch } = useContext(Context);

  const [question, setQuestion] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const { quizContent, score, questionIndex } = store;
  const { roundId, roundQuestions, roundName } = quizContent;
  const quizLength = roundQuestions.length;

  useEffect(() => {
    const isFirstQuestion = questionIndex === 0;
    if (hasAnswered || isFirstQuestion) {
      updateQuiz();
    }
  }, [hasAnswered]);

  function updateQuiz() {
    const quizIsOver = isLastQuestion();
    if (quizIsOver) {
      endQuiz();
    } else {
      setTheNextQuestion();
    }
  }

  function setTheNextQuestion() {
    if (!question) {
      const firstQuestion = getQuestion(store, questionIndex);
      setQuestion(firstQuestion);
    } else {
      updateQuestion();
    }
  }

  useEffect(() => {
    if (question) {
      const time = Number(Number(question.timeLimit) * 1000 + 500);

      const timer = setTimeout(() => {
        updateQuiz();
        setHasAnswered(true); // this shows the correct answer
        setTimeIsUp(true);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [question]);

  function checkAnswer(answerGuess) {
    return question.answer === answerGuess;
  }

  function updateQuestion() {
    const nextIndex = questionIndex + 1;

    setTimeout(() => {
      updateQuestionIndex(dispatch, nextIndex);
      const nextQuestion = getQuestion(store, nextIndex);
      setQuestion(nextQuestion);
      setHasAnswered(false);
      setTimeIsUp(false);
    }, 1500);
  }

  function endQuiz() {
    const userTotalScore = authUser.score + score;
    const payload = {
      authUser,
      score,
      roundId
    };

    return firebase.updateUserProgress(payload, () => {
      setTimeout(() => {
        updateTotalScore(dispatch, userTotalScore);
        history.push('/home');
      }, 1500);
    });
    // return firebase.updateLeaderboard();
  }

  function isLastQuestion() {
    return questionIndex && questionIndex + 1 === quizLength;
  }

  function handleAnswerSelect(answerGuess) {
    if (timeIsUp) {
      return false;
    }

    setHasAnswered(true);
    const isCorrect = checkAnswer(answerGuess);
    const { pointValue } = question;

    if (isCorrect) {
      updateScore(dispatch, score + pointValue);
    }
  }

  if (!question) return null;

  return (
    <Quiz
      answer={question.answer}
      answered={hasAnswered}
      onAnswerSelected={handleAnswerSelect}
      question={question.body}
      answerOptions={question.choices}
      timeLimit={question.timeLimit}
      quizLength={quizLength}
      questionIndex={questionIndex}
      roundName={roundName}
      score={score}
    />
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);
