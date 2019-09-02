import React from 'react';
import PropTypes from 'prop-types';

import { questionCount } from './QuestionCount.module.css';

function QuestionCount(props) {
  const { currentQuestion, quizLength } = props;

  return (
    <div className={questionCount}>
      Question <span>{currentQuestion}</span>/<span>{quizLength}</span>
    </div>
  );
}

QuestionCount.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  quizLength: PropTypes.number.isRequired
};

export default QuestionCount;
