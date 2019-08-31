import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  answerOption,
  radioCustomButton,
  radioCustomLabel
} from './AnswerOption.module.css';

function AnswerOption(props) {
  const { answerContent, onAnswerSelected } = props;
  const [answer, setAnswer] = useState('');

  function handleChange(e) {
    const { value } = e.target;

    setAnswer(value);
    onAnswerSelected(value);
  }

  return (
    <li className={answerOption}>
      <input
        type="radio"
        className={radioCustomButton}
        name="radioGroup"
        checked={answerContent === answer}
        id={answerContent}
        value={answerContent}
        disabled={answer}
        onChange={handleChange}
      />
      <label className={radioCustomLabel} htmlFor={answerContent}>
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
