import React from 'react';

import { AuthUserContext } from 'components/Session';
import useContentful from './useContentful';
import QuizContainer from 'containers/QuizContainer';
import QuizTitle from 'components/QuizTitle';

import { quizHeader } from './QuizPage.module.css';

function QuizPage() {
  const { isFetching, content } = useContentful();
  // TODO: shape the round to only have what the quizContainer needs
  if (isFetching || !content) {
    return <h2>loading...</h2>;
  }

  const { name } = content.fields;

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <>
          <div className={quizHeader}>
            <QuizTitle title={name} />
          </div>
          <QuizContainer round={content} authUser={authUser} />
        </>
      )}
    </AuthUserContext.Consumer>
  );
}

export default QuizPage;
