import React from 'react';
import QuizTitle from 'components/QuizTitle';
import QuizScore from 'components/QuizScore';
import { quizHeader, right } from './QuizHeader.module.scss';
import logo from '../../images/logo.svg';

function QuizHeaderContainer({ title, score }) {
  return (
    <div className={quizHeader}>
      <img src={logo} />
      <div className={right}>
        <QuizTitle title={title} />
        <QuizScore score={score} />
      </div>
    </div>
  );
}

export { QuizHeaderContainer };
