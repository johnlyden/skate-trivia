import React from 'react';
import AnswerOption from 'components/AnswerOption';
import Question from 'components/Question';
import Fade from 'components/Animations/Fade';

import styles from './QuizBody.module.css';

function QuizBody(props) {
  const { onAnswerSelected, question, answerOptions, answer, answered } = props;
  return (
    <div data-testid="quiz-body" className={styles.quizBody}>
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
      </Fade>
    </div>
  );
}

export default QuizBody;
