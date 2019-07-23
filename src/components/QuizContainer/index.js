import React, { useEffect, useReducer } from 'react';
import Quiz from 'components/Quiz';

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    case 'answer':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

const initialState = {
  question: '',
  correctAnswer: '',
  questionId: 1,
  answerOptions: [],
  counter: 0,
  pointValue: 0,
  timeLimit: 0,
  score: 0,
  totalQuestions: 0,
  loaded: false
};

function QuizContainer({ round, authUser }) {
  const [quizState, dispatch] = useReducer(reducer, initialState);
  const quizQuestions = round.fields.questions;

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: {
        question: quizQuestions[0].fields.body,
        answerOptions: quizQuestions[0].fields.choices,
        timeLimit: quizQuestions[0].fields.timeLimit,
        pointValue: quizQuestions[0].fields.pointValue,
        correctAnswer: quizQuestions[0].fields.answer,
        quizLength: quizQuestions.length
      }
    });
  }, [round]);

  function handleAnswerSelect(answerGuess) {
    const { counter, correctAnswer, score, questionId } = quizState;
    let payload;
    let nextQuestion = counter + 1;

    if (answerGuess === correctAnswer) {
      payload = {
        score: score + quizState.pointValue,
        question: quizQuestions[nextQuestion].fields.body,
        answerOptions: quizQuestions[nextQuestion].fields.choices,
        timeLimit: quizQuestions[nextQuestion].fields.timeLimit,
        pointValue: quizQuestions[nextQuestion].fields.pointValue,
        correctAnswer: quizQuestions[nextQuestion].fields.answer,
        counter: counter + 1,
        questionId: questionId + 1
      };
      setTimeout(
        () =>
          dispatch({
            type: 'answer',
            payload: payload
          }),
        500
      );
    }
  }

  if (!quizState.loaded) return null;

  return (
    <Quiz onAnswerSelected={handleAnswerSelect} questionData={quizState} />
  );
}

export default QuizContainer;
