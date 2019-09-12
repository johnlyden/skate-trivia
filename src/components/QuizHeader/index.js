import React, { useContext } from 'react';
import QuizTitle from 'components/QuizTitle';
import QuestionCount from 'components/QuestionCount';
import { Context } from 'store';
import { quizHeader } from './QuizHeader.module.css';

function QuizHeader() {
  // TODO: shape the round to only have what the quizContainer needs
  const { store } = useContext(Context);
  const { quizContent, questionId } = store;

  const { roundName, roundQuestions } = quizContent;
  const quizLength = roundQuestions.length;

  return (
    <div className={quizHeader}>
      <QuizTitle title={roundName} />
      <QuestionCount
        currentQuestion={questionId + 1}
        quizLength={quizLength}
        data-testid="question-count"
      />
    </div>
  );
}

export default QuizHeader;
