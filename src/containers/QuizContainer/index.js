import React, { useState, useEffect, useReducer } from 'react';
// import Confetti from "react-dom-confetti";

import QuizHeader from 'components/Quiz/QuizHeader';
import QuizFooter from 'components/Quiz/QuizFooter';
import QuizBody from 'components/Quiz/QuizBody';

import { initialState, reducer } from './reducer';
import {
  selectedCorrectAnswer,
  selectedWrongAnswer,
  advanceQuizWithDelay,
  endQuizWithDelay,
} from './actions';

export const DELAY = 1500;

const config = {
  angle: 90,
  spread: '69',
  startVelocity: 45,
  elementCount: '100',
  dragFriction: 0.1,
  duration: '2500',
  stagger: 0,
  width: '30px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

function QuizContainer({ onGameOver, quizContent }) {
  const { roundName, roundQuestions, roundId } = quizContent;
  const quizLength = roundQuestions.length;

  const [quizStore, dispatch] = useReducer(reducer, initialState);
  const { hasAnswered, questionIndex, score, gameOver } = quizStore;

  const [question, setQuestion] = useState(roundQuestions[questionIndex]);
  // const [showConfetti, setShowConfetti] = useState(false);
  const { body, answer, choices, timeLimit, pointValue } = question;
  // const right = new UIfx(beepMp3);

  // LISTEN FOR WHEN A QUESTION HAS BEEN ANSWERED - ADVANCE OR END QUIZ
  useEffect(() => {
    if (hasAnswered) {
      if (questionIndex < quizLength - 1) {
        advanceQuizWithDelay(dispatch);
      } else {
        endQuizWithDelay(dispatch);
      }
    }
  }, [hasAnswered]);

  // LISTEN FOR WHEN TO SHOW A NEW QUESTION
  useEffect(() => {
    if (questionIndex) {
      setQuestion(roundQuestions[questionIndex]);
    }
  }, [questionIndex]);

  // LISTEN FOR GAME TO END
  useEffect(() => {
    if (gameOver) {
      onGameOver({ finalScore: score, roundId });
    }
  }, [gameOver]);

  // LISTEN FOR TIMER TO END
  useEffect(() => {
    if (question) {
      const time = Number(Number(timeLimit) * 1000 + 500);
      const timer = setTimeout(() => {
        // selectedWrongAnswer(dispatch);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [question]);

  function handleAnswerSelect(answerGuess) {
    if (hasAnswered) {
      return false;
    }

    if (answerGuess === answer) {
      selectedCorrectAnswer(dispatch, { pointValue });
    } else {
      selectedWrongAnswer(dispatch);
    }
  }

  return (
    <div>
      <QuizHeader
        quizLength={quizLength}
        title={roundName}
        score={score}
        questionIndex={questionIndex + 1}
      />
      <QuizBody
        question={body}
        answerOptions={choices}
        answer={answer}
        answered={hasAnswered}
        onAnswerSelected={handleAnswerSelect}
      />
      <QuizFooter timeLimit={timeLimit} questionIndex={questionIndex} />
    </div>
  );
}

export default QuizContainer;
