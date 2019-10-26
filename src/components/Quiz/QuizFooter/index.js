import React from 'react';

import TimerProgress from 'components/TimerProgress';
import QuestionCount from 'components/QuestionCount';
import Fade from 'components/Animations/Fade';

import * as styles from './QuizFooter.module.scss';

function QuizFooter({ questionIndex, timeLimit, quizLength }) {
  return (
    <Fade key={questionIndex}>
      <div className={styles.timerContainer}>
        <QuestionCount
          currentQuestion={questionIndex}
          quizLength={quizLength}
        />
        <TimerProgress timeLimit={timeLimit} />
      </div>
    </Fade>
  );
}

export default QuizFooter;
