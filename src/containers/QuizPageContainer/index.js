import React, { useContext } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { AuthUserContext } from 'components/Session';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';

import QuizContainer, { DELAY } from 'containers/QuizContainer';
import Layout from 'components/Layout';

import { quizPage } from './QuizPageContainer.module.scss';

function QuizPage({ firebase, history }) {
  const { store } = useContext(Context);
  const authUser = useContext(AuthUserContext);

  const { quizContent } = store;

  if (!quizContent) {
    return <h2>loading...</h2>;
  }

  function handleOnGameOver({ finalScore, roundId }) {
    return firebase.updateUserProgress(
      { finalScore, authUser, roundId },
      () => {
        setTimeout(() => {
          history.push('/home');
        }, DELAY);
      }
    );
  }

  return (
    <div className={quizPage}>
      <Layout>
        <QuizContainer
          onGameOver={handleOnGameOver}
          quizContent={quizContent}
          authUser={authUser}
        />
      </Layout>
    </div>
  );
}

export default compose(
  withFirebase,
  withRouter
)(QuizPage);
