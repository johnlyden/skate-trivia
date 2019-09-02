import React from 'react';

import { quizTitle } from './QuizTitle.module.css';

function QuizTitle({ title }) {
  return <h2 className={quizTitle}>{title}</h2>;
}

export default QuizTitle;
