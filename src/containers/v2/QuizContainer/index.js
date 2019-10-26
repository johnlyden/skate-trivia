import React, { useState, useEffect } from 'react';
import QuizHeader from 'components/Quiz/QuizHeader';
import QuizFooter from 'components/Quiz/QuizFooter';
import QuizBody from 'components/Quiz/QuizBody';

export const DELAY = 1500;

function QuizContainer({ onGameOver, quizContent }) {
  const { roundName, roundQuestions, roundId } = quizContent;
  const quizLength = roundQuestions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(roundQuestions[questionIndex]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { body, answer, choices, timeLimit, pointValue } = question;

  // listen for the index to update to let us know we should try to go to next question
  useEffect(() => {
    // if there is another question
    if (questionIndex <= quizLength - 1) {
      setQuestionWithDelay();
    } else {
      endQuizWithDelay();
    }
  }, [questionIndex]);

  useEffect(() => {
    if (gameOver) {
      onGameOver({ finalScore: score, roundId });
    }
  }, [gameOver]);

  // HANDLES THE TIMER
  useEffect(() => {
    if (question) {
      const time = Number(Number(timeLimit) * 1000 + 500);
      const timer = setTimeout(() => {
        setHasAnswered(true);
        setQuestionIndex(questionIndex + 1);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [question]);

  function endQuizWithDelay() {
    setTimeout(() => {
      setGameOver(true);
    }, 1500);
  }

  function setQuestionWithDelay() {
    setTimeout(() => {
      setQuestion(roundQuestions[questionIndex]);
      setQuestionNumber(questionIndex + 1);
      setHasAnswered(false);
    }, DELAY);
  }

  function handleAnswerSelect(answerGuess) {
    if (answerGuess === answer) {
      // update the button colors
      setHasAnswered(true);
      // update the score
      setScore(score + pointValue);
      // updating the index is the internal state of the quiz
      // advance to the next question
      setQuestionIndex(questionIndex + 1);
    } else {
      // update the button colors
      setHasAnswered(true);
      setQuestionIndex(questionIndex + 1);
      // advance to the next question
    }
    // const isCorrect = checkAnswer(answerGuess);

    // if (isCorrect) {
    //   const { pointValue } = question;
    //   updateScore(dispatch, score + pointValue);
    // }
    // setHasAnswered(true);
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
