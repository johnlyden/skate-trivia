import React, { useContext } from 'react';

import { AuthUserContext } from 'components/Session';
import { Context } from 'store';
import QuizContainer from 'containers/QuizContainer';
import QuizHeader from 'components/QuizHeader';
import Layout from 'components/Layout';
import { quizPage } from './QuizPage.module.scss';

function QuizPage() {
  const { store } = useContext(Context);
  const { quizContent } = store;

  if (!quizContent) {
    return <h2>loading...</h2>;
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className={quizPage}>
          <Layout>
            <QuizHeader />
            <QuizContainer authUser={authUser} />
          </Layout>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

export default QuizPage;
