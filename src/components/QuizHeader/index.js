import React from 'react';
import QuizTitle from 'components/QuizTitle';
import QuizScore from 'components/QuizScore';
import { quizHeader, imageContainer } from './QuizHeader.module.scss';
import logo from 'images/skate-stumpers-1.jpg';
function QuizHeader({ title, timeLimit, score }) {
  return (
    <div className={quizHeader}>
      <QuizTitle title={title} />
      {/* <div className={imageContainer}>
        <img src={logo} />
      </div> */}
      <QuizScore score={score} />
      {/* <TimerProgress timeLimit={timeLimit} /> */}
    </div>
  );
}

export default QuizHeader;
