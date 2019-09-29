import React from 'react';
import QuizTitle from 'components/QuizTitle';
import QuizScore from 'components/QuizScore';
import { quizHeader } from './QuizHeader.module.scss';

function QuizHeader({ title, timeLimit, score }) {
  console.log({ score });
  return (
    <div className={quizHeader}>
      <QuizTitle title={title} />
      <QuizScore score={score} />
      {/* <TimerProgress timeLimit={timeLimit} /> */}
    </div>
  );
}

export default QuizHeader;
