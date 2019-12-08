import React, { useContext, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter, useParams } from 'react-router-dom';

import { AuthUserContext } from 'components/Session';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';

import QuizContainer, { DELAY } from 'containers/QuizContainer';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';
// import { formatScore } from '../../utils/helpers';
import { formatScores } from 'utils/helpers';

import { quizPage } from './QuizPageContainer.module.scss';
import {
  UPDATE_TOTAL_SCORE,
  ADD_VALUES_TO_LEADERBOARD,
} from '../../store/actions';

function QuizPage({ firebase, history }) {
  const { dispatch, store } = useContext(Context);
  const authUser = useContext(AuthUserContext);
  const { quizContent, leaderboard } = store;

  const { id: archivedRoundId } = useParams();

  useEffect(() => {
    if (!leaderboard) {
      firebase.leaderboard().once('value', snapshot => {
        const leaderboardObject = snapshot.val();
        if (leaderboardObject) {
          dispatch({
            type: ADD_VALUES_TO_LEADERBOARD,
            payload: {
              leaderboard: leaderboardObject,
            },
          });
        }
      });
    }

    return () => {
      firebase.leaderboard().off();
    };
  });

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

    // check if its a high score
    let hasNewHighScore = false;

    if (leaderboard) {
      const highScores = formatScores(leaderboard);
      const userHighScore = authUser.score + finalScore;

      if (userHighScore > highScores[highScores.length - 1][0]) {
        hasNewHighScore = true;
      }
    }

    return firebase.updateUserProgress(
      { finalScore, authUser, roundId, hasNewHighScore },
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
    <Layout>
      <div className={quizPage} data-testid='quiz-page'>
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
      </div>
    </Layout>
  );
}

export default compose(withFirebase, withRouter)(QuizPage);
