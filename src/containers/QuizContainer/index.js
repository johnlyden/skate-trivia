import React, { useState, useEffect, useReducer } from "react";

import QuizHeader from "components/Quiz/QuizHeader";
import QuizFooter from "components/Quiz/QuizFooter";
import QuizBody from "components/Quiz/QuizBody";

import { initialState, reducer } from "./reducer";
import {
  selectedCorrectAnswer,
  selectedWrongAnswer,
  advanceQuizWithDelay,
  endQuizWithDelay
} from "./actions";

export const DELAY = 1500;

function QuizContainer({ onGameOver, quizContent }) {
  const { roundName, roundQuestions, roundId } = quizContent;
  const quizLength = roundQuestions.length;

  const [quizStore, dispatch] = useReducer(reducer, initialState);
  const { hasAnswered, questionIndex, score, gameOver } = quizStore;

  const [question, setQuestion] = useState(roundQuestions[questionIndex]);
  const { body, answer, choices, timeLimit, pointValue } = question;

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
    <div data-testid="quiz-container">
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
      <QuizFooter
        questionIndex={questionIndex + 1}
        timeLimit={timeLimit}
        quizLength={quizLength}
      />
    </div>
  );
}

export default QuizContainer;
