import React, { useContext, useEffect } from 'react';
import { compose } from 'recompose';
import { useParams } from 'react-router';
import { withRouter } from 'react-router-dom';

import { AuthUserContext } from 'components/Session';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';

import QuizContainer, { DELAY } from 'containers/QuizContainer';
import Layout from 'components/Layout';
import LoadingSpinner from 'components/LoadingSpinner';
import ArchivedIndicator from 'components/ArchivedIndicator';
import { formatScores } from 'utils/helpers';

import { quizPage } from './QuizPageContainer.module.scss';
import {
  UPDATE_TOTAL_SCORE,
  ADD_VALUES_TO_LEADERBOARD,
} from '../../store/actions';

export function QuizPageBase({ firebase, history }) {
  const { dispatch, store } = useContext(Context);
  const authUser = useContext(AuthUserContext);
  const { quizContent, leaderboard, archivedRounds } = store;

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
      history.push('/signup');
      return;
    }

    if (archivedRoundId) {
      history.push('/archive');
      return;
    }
    // check if its a high score
    let hasNewHighScore = true;
    let ranking = '';
    let redirectUrl = `/leaderboard`;

    /**
     * Showing the user what place they are in

    if (leaderboard) {
      const highScores = formatScores(leaderboard);
      const userHighScore = authUser.score + finalScore;
      const lowestScore = highScores[highScores.length - 1][0];

      if (userHighScore === lowestScore) {
        hasNewHighScore = true;
        ranking = 'tied for last';
      }

      if (userHighScore > lowestScore) {
        hasNewHighScore = true;
        const rawScores = highScores.map(s => s[0]);
        console.log({ rawScores });
        ranking = determineRank(rawScores, userHighScore);
        console.log({ ranking });
      }
    }

    if (hasNewHighScore) {
      redirectUrl += `?rank=${rankMap[ranking]}`;
    }

   */
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
          history.push(redirectUrl);
        }, DELAY);
      },
    );
  }

  if (archivedRoundId && !archivedRounds) {
    return (
      <Layout>
        <LoadingSpinner></LoadingSpinner>
      </Layout>
    );
  }

  let round = quizContent;

  if (archivedRounds && archivedRoundId) {
    round = archivedRounds[archivedRoundId];
  }

  return (
    <Layout bottomLogo>
      <div className={quizPage} data-testid='quiz-page'>
        {quizContent ? (
          <>
            {archivedRoundId && (
              <ArchivedIndicator archivedDate={round.roundName} />
            )}
            <QuizContainer
              onGameOver={handleOnGameOver}
              quizContent={round}
              authUser={authUser}
              isArchivedRound={archivedRoundId}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </Layout>
  );
}

export function determineRank(arr, num) {
  const uniq = [...new Set(arr.concat(num))];
  return uniq.sort((a, b) => a - b).indexOf(num);
}

const rankMap = {
  0: 'last',
  1: '3rd',
  2: '2nd',
  3: '1st',
};

export default compose(withFirebase, withRouter)(QuizPageBase);
