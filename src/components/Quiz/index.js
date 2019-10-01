import React from 'react';
import AnswerOption from 'components/AnswerOption';
import Question from 'components/Question';
import QuestionCount from 'components/QuestionCount';
import QuizHeader from 'components/QuizHeader';
import Fade from 'components/Animations/Fade';
import TimerProgress from 'components/TimerProgress';

import styles from './Quiz.module.css';

function Quiz(props) {
  const {
    onAnswerSelected,
    question,
    answerOptions,
    timeLimit,
    questionIndex,
    quizLength,
    roundName,
    score,
    answer,
    answered
  } = props;

  return (
    <div data-testid="quiz" className={styles.quizContainer}>
      <QuizHeader title={roundName} timeLimit={timeLimit} score={score} />
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
                rightAnswer={answer}
                answered={answered}
                className={answer === option && 'correct'}
              />
            );
          })}
        </ul>
        <div className={styles.timerContainer}>
          <QuestionCount
            currentQuestion={questionIndex + 1}
            quizLength={quizLength}
          />
        </div>
        <TimerProgress timeLimit={timeLimit} />
      </Fade>
    </div>
  );
}

export default Quiz;
