import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import AnswerOption from 'components/AnswerOption';
import Question from 'components/Question';
import QuestionCount from 'components/QuestionCount';
import TimerProgress from 'components/TimerProgress';

import styles from './Quiz.module.css';

function Quiz(props) {
  const { questionData, onAnswerSelected } = props;
  const {
    question,
    answerOptions,
    timeLimit,
    questionId,
    questionLibrary
  } = questionData;

  const quizLength = questionLibrary.length;

  return (
    <div data-testid="quiz">
      <QuestionCount
        currentQuestion={questionId + 1}
        quizLength={quizLength}
        data-testid="question-count"
      />
      <CSSTransitionGroup
        className="container"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        key={question}
        transitionAppearTimeout={500}>
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
      </CSSTransitionGroup>
    </div>
  );
}

export default Quiz;
