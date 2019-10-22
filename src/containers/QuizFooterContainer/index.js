import React, { useContext } from 'react';

import { Context } from 'store';
import TimerProgress from 'components/TimerProgress';
import QuestionCount from 'components/QuestionCount';
import Fade from 'components/Animations/Fade';
import { getTimeLimit, getQuizLength } from './selectors';

import * as styles from './QuizFooter.module.scss';

function QuizFooterContainer() {
  const { store } = useContext(Context);
  const { questionIndex } = store;
  const timeLimit = getTimeLimit(store, questionIndex);
  const quizLength = getQuizLength(store);

  return (
    <Fade key={questionIndex}>
      <div className={styles.timerContainer}>
        <QuestionCount
          currentQuestion={questionIndex + 1}
          quizLength={quizLength}
        />
        <TimerProgress timeLimit={timeLimit} />
      </div>
    </Fade>
  );
}

export { QuizFooterContainer };
