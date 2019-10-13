import React, { useContext, useEffect, useState } from 'react';
import { Context } from 'store';
import { getTimeLimit } from './selectors';
import QuestionCount from 'components/QuestionCount';
import TimerProgress from 'components/TimerProgress';
import { quizFooter } from './QuizFooter.module.scss';
import { useTimer } from 'hooks/useTimer';

function QuizFooterContainer({
  currentQuestionIdx,
  totalQuestions,
  handleTimeUp
}) {
  const { store } = useContext(Context);
  const { quizContent, questionIndex } = store;
  const [timeIsUp, setTimeIsUp] = useState(false);
  const { roundQuestions } = quizContent;
  const question = roundQuestions[questionIndex];

  useTimer(question.timeLimit * 1000, () => {
    setTimeIsUp(true);
    handleTimeUp();
  });

  const timeLimit = getTimeLimit(store, questionIndex);

  useEffect(() => {
    setTimeIsUp(false);
  }, [questionIndex]);

  console.log('timeLimit: ', timeLimit);
  return (
    <div className={quizFooter}>
      <QuestionCount
        currentQuestion={currentQuestionIdx + 1}
        quizLength={totalQuestions}
      />
      {timeLimit && <TimerProgress timeLimit={timeLimit} timeIsUp={timeIsUp} />}
    </div>
  );
}

export { QuizFooterContainer };
