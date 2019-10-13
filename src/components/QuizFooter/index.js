import React from 'react';
import QuestionCount from 'components/QuestionCount';
import TimerProgress from 'components/TimerProgress';
import { quizFooter } from './QuizFooter.module.scss';

function QuizFooter({ timeLimit, currentQuestion, quizLength, timeIsUp }) {
  return (
    <div className={quizFooter}>
      <h2>fuuuuuuuu</h2>
      <QuestionCount
        currentQuestion={currentQuestion}
        quizLength={quizLength}
      />
      <TimerProgress timeLimit={timeLimit} timeIsUp={timeIsUp} />
    </div>
  );
}

export default QuizFooter;
