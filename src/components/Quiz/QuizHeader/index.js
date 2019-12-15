import React from 'react';
import QuestionCount from 'components/QuestionCount';
import QuizTitle from 'components/QuizTitle';
import QuizScore from 'components/QuizScore';
import { quizHeader } from './QuizHeader.module.scss';

function QuizHeader({ title, score, questionIndex, quizLength, showScore }) {
  return (
    <div className={quizHeader}>
      {/* <QuizTitle title={title} /> */}
      <QuestionCount currentQuestion={questionIndex} quizLength={quizLength} />
      {showScore && <QuizScore score={score} />}
    </div>
  );
}

export default QuizHeader;
