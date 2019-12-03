import React from 'react';
import PropTypes from 'prop-types';

import { questionCount } from './QuestionCount.module.scss';

function QuestionCount(props) {
  const { currentQuestion, quizLength } = props;

  return (
    <div className={questionCount} data-testid='question-count'>
      Question {currentQuestion}/{quizLength}
    </div>
  );
}

QuestionCount.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  quizLength: PropTypes.number.isRequired,
};

export default QuestionCount;
