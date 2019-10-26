import React, { useState, useEffect, useReducer } from 'react';

import { QuizContext } from './actions';
import QuizHeader from 'components/Quiz/QuizHeader';
import QuizFooter from 'components/Quiz/QuizFooter';
import QuizBody from 'components/Quiz/QuizBody';
import {
  requestAdvanceQuiz,
  requestEndQuiz,
  initialState,
  reducer,
  selectAnswer,
  showTimeIsUp
} from './actions';

export const DELAY = 1500;

function QuizContainer({ onGameOver, quizContent }) {
  const { roundName, roundQuestions, roundId } = quizContent;
  const quizLength = roundQuestions.length;

  const [quizStore, dispatch] = useReducer(reducer, initialState);
  const { shouldAdvance, gameOver, hasAnswered, questionIndex } = quizStore;
  // const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(roundQuestions[questionIndex]);

  const { body, answer, choices, timeLimit, pointValue } = question;

  useEffect(() => {
    // console.log({ questionIndex });
    if (questionIndex <= quizLength - 1) {
      requestAdvanceQuiz(dispatch, { questionNumber: questionIndex + 1 });
    } else {
      requestEndQuiz(dispatch);
    }
  }, [questionIndex]);

  useEffect(() => {
    console.log({ shouldAdvance });
    if (shouldAdvance) {
      setQuestion(roundQuestions[questionIndex]);
    }
  }, [shouldAdvance]);

  useEffect(() => {
    if (gameOver) {
      onGameOver({ finalScore: score, roundId });
    }
  }, [gameOver]);

  useEffect(() => {
    if (question) {
      console.log({ timeLimit });
      const time = Number(Number(timeLimit) * 1000 + 500);
      const timer = setTimeout(() => {
        showTimeIsUp(dispatch);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [question]);

  function handleAnswerSelect(answerGuess) {
    if (answerGuess === answer) {
      setScore(score + pointValue);
    }
    selectAnswer(dispatch);
    // setHasAnswered(true);
    // setQuestionIndex(questionIndex + 1);
  }

  return (
    <>
      <QuizHeader title={roundName} score={score} />
      <QuizBody
        question={body}
        answerOptions={choices}
        answer={answer}
        answered={hasAnswered}
        onAnswerSelected={handleAnswerSelect}
      />
      <QuizFooter
        questionIndex={questionNumber}
        timeLimit={timeLimit}
        quizLength={quizLength}
      />
    </>
  );
}

export default QuizContainer;
