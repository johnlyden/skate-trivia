import React, { useContext } from 'react';

import { AuthUserContext } from 'components/Session';
import { Context } from 'store';
import QuizContainer from 'containers/QuizContainer';
import QuizHeader from 'components/QuizHeader';

function QuizPage() {
  // TODO: shape the round to only have what the quizContainer needs
  const { store } = useContext(Context);
  const { quizContent } = store;

  if (!quizContent) {
    return <h2>loading...</h2>;
  }

  const { roundQuestions, roundId } = quizContent;

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <>
          <QuizHeader />
          <QuizContainer
            roundId={roundId}
            roundQuestions={roundQuestions}
            authUser={authUser}
          />
        </>
      )}
    </AuthUserContext.Consumer>
  );
}

export default QuizPage;
