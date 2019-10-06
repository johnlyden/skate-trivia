import React, { useContext, useEffect } from 'react';
import { Context } from 'store';
import QuizFooter from 'components/QuizFooter';
import { getTimeLimit } from './selectors';

function QuizFooterContainer() {
  const { store } = useContext(Context);
  const { quizContent, questionIndex } = store;
  const { roundQuestions } = quizContent;
  const quizLength = roundQuestions.length;
  const timeLimit = getTimeLimit(store, questionIndex);

  useEffect(() => {}, [questionIndex]);

  return (
    <QuizFooter
      quizLength={quizLength}
      currentQuestion={questionIndex + 1}
      timeLimit={timeLimit}
    />
  );
}

export { QuizFooterContainer };
