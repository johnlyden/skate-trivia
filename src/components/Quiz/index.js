import React from 'react';
import AnswerOption from 'components/AnswerOption';
import Question from 'components/Question';
import TimerProgress from 'components/TimerProgress';
import Fade from 'components/Animations/Fade';

import styles from './Quiz.module.css';

function Quiz(props) {
  const { onAnswerSelected, question, answerOptions, timeLimit } = props;
  return (
    <div data-testid="quiz" className={styles.quizContainer}>
      <Fade key={question}>
        <Question content={question} />
        <ul className={styles.answerOptions}>
          {answerOptions.map((option, i) => {
            return (
              <AnswerOption
                data-testid={`answer-option-${i}`}
                onAnswerSelected={onAnswerSelected}
                answerContent={option}
                key={option}
              />
            );
          })}
        </ul>
        <div className={styles.timerContainer}>
          <TimerProgress timeLimit={timeLimit} data-testid="timer" />
        </div>
      </Fade>
    </div>
  );
}

export default Quiz;
