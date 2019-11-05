import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { radioCustomButton } from './AnswerOption.module.scss';
import cx from 'classnames';
import styles from './AnswerOption.module.scss';
import './button.scss';

function AnswerOption(props) {
  const {
    answerContent,
    onAnswerSelected,
    rightAnswer,
    className,
    answered
  } = props;

  const [answer, setAnswer] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    setAnswer(value);
    onAnswerSelected(value);
  }

  return (
    <li>
      <input
        data-test-id="answer-option"
        type="radio"
        className={cx(
          radioCustomButton,
          {
            [styles.correct]: answer === rightAnswer || (answered && className),
            [styles.wrong]: answer !== rightAnswer
          },
          className
        )}
        name="radioGroup"
        checked={answerContent === answer}
        id={answerContent}
        value={answerContent}
        disabled={answer}
        onChange={handleChange}
      />
      <label className="button2 b-green rot-135" htmlFor={answerContent}>
        {answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};
export default AnswerOption;
