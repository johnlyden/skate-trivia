import React, { useContext, useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withRouter, useParams } from 'react-router-dom';

import { AuthUserContext } from 'components/Session';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';

import QuizContainer, { DELAY } from 'containers/QuizContainer';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';

import { quizPage } from './QuizPageContainer.module.scss';
import { UPDATE_TOTAL_SCORE } from '../../store/actions';

function QuizPage({ firebase, history }) {
  const { dispatch, store } = useContext(Context);
  const authUser = useContext(AuthUserContext);
  const { quizContent } = store;

  const { id: archivedRoundId } = useParams();

  function handleOnGameOver({ finalScore, roundId }) {
    if (!authUser) {
      dispatch({
        type: UPDATE_TOTAL_SCORE,
        payload: {
          totalScore: finalScore,
        },
      });
      // TODO: take to a page where they have to sign up to persist
      history.push('/signup');
      return;
    }
    return firebase.updateUserProgress(
      { finalScore, authUser, roundId },
      () => {
        setTimeout(() => {
          dispatch({
            type: UPDATE_TOTAL_SCORE,
            payload: {
              totalScore: authUser.score + finalScore,
            },
          });
          history.push('/home');
        }, DELAY);
      },
    );
  }

  return (
    <div className={quizPage} data-testid='quiz-page'>
      <Layout>
        {archivedRoundId && <h2>dis is old</h2>}
        {quizContent ? (
          <QuizContainer
            onGameOver={handleOnGameOver}
            quizContent={quizContent}
            authUser={authUser}
            isArchivedRound={archivedRoundId}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Layout>
    </div>
  );
}

export default compose(withFirebase, withRouter)(QuizPage);
