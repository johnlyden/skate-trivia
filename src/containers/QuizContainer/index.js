import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Context } from 'store';
import {
  updateScore,
  updateQuestionIndexWithTimer,
  updateTotalScoreWithTimer
} from './actions';
import { getQuestion } from './selectors';
import { withFirebase } from 'components/Firebase';
import Quiz from 'components/Quiz';

export const DELAY = 1500;

function QuizContainer({ authUser, history, firebase }) {
  const { store, dispatch } = useContext(Context);

  const [question, setQuestion] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const { quizContent, score, questionIndex } = store;
  const { roundId, roundQuestions, roundName } = quizContent;
  const quizLength = roundQuestions.length;

  useEffect(() => {
    if (hasAnswered) {
      updateQuiz();
    }
  }, [hasAnswered]);

  useEffect(() => {
    const isFirstQuestion = questionIndex === 0;
    if (isFirstQuestion && !question) {
      setTheNextQuestion();
    }
  });

  function updateQuiz() {
    // const quizIsOver = isLastQuestion();
    const quizIsOver = true;
    // const isFirstQuestion = questionIndex === 0;
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

  // HANDLES THE TIMER
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

  useEffect(() => {
    if (questionIndex) {
      const nextQuestion = getQuestion(store, questionIndex);
      setQuestion(nextQuestion);
      setHasAnswered(false);
      setTimeIsUp(false);
    }
  }, [questionIndex]);

  function updateQuestion() {
    const nextIndex = questionIndex + 1;
    updateQuestionIndexWithTimer(dispatch, nextIndex);
  }

  function endQuiz() {
    console.log(
      'inside endQuizzzz----------------------------------------------------'
    );
    console.log({ score });
    // const userTotalScore = authUser.score + score;
    const payload = {
      authUser,
      score,
      roundId
    };
    // TODO; DISPATCHING WITH A 0 AS SCORE - NEED TO HAVE THIS HAPPEN WHEN SCORE IS UPDATED
    updateTotalScoreWithTimer(dispatch);
    return firebase.updateUserProgress(payload, () => {
      setTimeout(() => {
        history.push('/home');
      }, DELAY);
    });
  }

  function isLastQuestion() {
    const lastQuestion = questionIndex + 1 === quizLength;
    return lastQuestion;
  }

  function handleAnswerSelect(answerGuess) {
    if (timeIsUp) {
      return false;
    }

    const isCorrect = checkAnswer(answerGuess);

    if (isCorrect) {
      const { pointValue } = question;
      updateScore(dispatch, score + pointValue);
    }
    setHasAnswered(true);
  }

  // useEffect(() => {
  //   if (answered) {
  //     console.log('answered in the hook');
  //   }
  // }, [answered])
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
