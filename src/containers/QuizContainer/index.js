import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Context } from 'store';
import { updateScore, updateTotalScore, updateQuestionIndex } from './actions';
import { getQuestion } from './selectors';
import { withFirebase } from 'components/Firebase';
import Quiz from 'components/Quiz';

function QuizContainer({ authUser, history, firebase }) {
  const { store, dispatch } = useContext(Context);

  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const { quizContent, score, questionIndex } = store;
  const { roundId, roundQuestions, roundName } = quizContent;
  const quizLength = roundQuestions.length;

  useEffect(() => {
    const firstQuestion = getQuestion(store, questionIndex);
    setQuestion(firstQuestion);
  }, []);

  useEffect(() => {
    if (question) {
      const time = Number(Number(question.timeLimit) * 1000 + 500);

      const timer = setTimeout(() => {
        const quizIsOver = isLastQuestion();
        if (quizIsOver) {
          endQuiz();
        } else {
          updateQuestion();
        }
        setAnswered(true);
        setTimeIsUp(true);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [question]);

  function checkAnswer(answerGuess) {
    const { pointValue, answer } = question;
    let currentScore = score;

    if (answer === answerGuess) {
      currentScore = currentScore + pointValue;
      updateScore(dispatch, currentScore);
    }
    return currentScore;
  }

  function updateQuestion() {
    const nextIndex = questionIndex + 1;

    setTimeout(() => {
      updateQuestionIndex(dispatch, nextIndex);
      const nextQuestion = getQuestion(store, nextIndex);
      setQuestion(nextQuestion);
      setAnswered(false);
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
      updateTotalScore(dispatch, userTotalScore);
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    });
    // return firebase.updateLeaderboard();
  }

  function isLastQuestion() {
    return questionIndex + 1 === quizLength;
  }

  function handleAnswerSelect(answerGuess) {
    if (timeIsUp) {
      return false;
    }

    setAnswered(true);

    checkAnswer(answerGuess);
    const quizIsOver = isLastQuestion();

    if (quizIsOver) {
      // ending before score is updated
      endQuiz();
    } else {
      updateQuestion();
    }
  }

  if (!question) return null;

  return (
    <Quiz
      answer={question.answer}
      answered={answered}
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
