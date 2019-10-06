import React from 'react';
import QuestionCount from 'components/QuestionCount';
import TimerProgress from 'components/TimerProgress';
import { quizFooter } from './QuizFooter.module.scss';

function QuizFooter({ timeLimit, currentQuestion, quizLength }) {
  return (
    <div className={quizFooter}>
      <QuestionCount
        currentQuestion={currentQuestion}
        quizLength={quizLength}
      />
      <TimerProgress timeLimit={timeLimit} questionIndex={currentQuestion} />
    </div>
  );
}

export default QuizFooter;
