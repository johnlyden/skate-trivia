import React from 'react';
import QuizTitle from 'components/QuizTitle';
import QuizScore from 'components/QuizScore';
import { quizHeader, imageContainer } from './QuizHeader.module.scss';
import logo from 'images/skate-stumpers-1.jpg';

function QuizHeader({ title, timeLimit, score }) {
  return (
    <div className={quizHeader}>
      <QuizTitle title={title} />
      <QuizScore score={score} />
    </div>
  );
}

export default QuizHeader;
