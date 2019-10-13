import React, { useContext } from 'react';

import { Context } from 'store';
import QuizHeader from 'components/QuizHeader';
import { getRoundName } from './selectors';

function QuizHeaderContainer() {
  const { store } = useContext(Context);
  const { score } = store;
  const roundName = getRoundName(store);

  return <QuizHeader title={roundName} score={score} />;
}

export { QuizHeaderContainer };
