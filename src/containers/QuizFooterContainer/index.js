import React, { useContext } from 'react';

import { Context } from 'store';
import TimerProgress from 'components/TimerProgress';
import QuestionCount from 'components/QuestionCount';
import Fade from 'components/Animations/Fade';
import { getTimeLimit } from './selectors';
import * as styles from './QuizFooter.module.scss';

function QuizFooterContainer() {
  const { store } = useContext(Context);
  const { questionIndex, quizContent } = store;
  const { roundQuestions } = quizContent;
  const quizLength = roundQuestions.length;
  const timeLimit = getTimeLimit(store, questionIndex);

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
