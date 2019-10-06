import React, { useContext } from 'react';
import { Context } from 'store';
import QuizHeader from 'components/QuizHeader';

function QuizHeaderContainer() {
  const { store } = useContext(Context);
  const { quizContent, score } = store;
  const { roundName } = quizContent;
  return <QuizHeader title={roundName} score={score} />;
}

export { QuizHeaderContainer };
