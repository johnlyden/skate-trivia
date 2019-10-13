import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Context } from 'store';
import { updateScore, updateTotalScore, updateQuestionIndex } from './actions';
import { getQuestion } from './selectors';
import { withFirebase } from 'components/Firebase';
import Quiz from 'components/Quiz';
import TimerProgress from 'components/TimerProgress';

import { QuizHeaderContainer as QuizHeader } from 'containers/QuizHeaderContainer';
import { QuizFooterContainer as QuizFooter } from 'containers/QuizFooterContainer';
import Fade from '../../components/Animations/Fade';

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

    const curRoundScore = checkAnswer(answerGuess);
    const quizIsOver = isLastQuestion();

    if (quizIsOver) {
      endQuiz(curRoundScore);
    } else {
      updateQuestion();
    }
  }

  if (!question) return null;

  return (
    // passing too many things - this is everything for the
    <>
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
      <Timer />
    </>
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizContainer);

function Timer() {
  // timer should load the appropriate time
  // timer should reset when question changes
  // timer should go away when it reaches 0
  useEffect(() => {});

  const { store, dispatch } = useContext(Context);
  const { questionIndex, quizContent } = store;
  const { roundQuestions } = quizContent;
  const question = roundQuestions[questionIndex];
  const { timeLimit } = question;

  // timeLimit is set correctly - this one does not update
  return (
    <Fade key={questionIndex}>
      <TimerProgress timeLimit={timeLimit} />
    </Fade>
  );
}
