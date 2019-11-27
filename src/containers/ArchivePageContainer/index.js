import React, { useContext } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { AuthUserContext } from 'components/Session';
import { withFirebase } from 'components/Firebase';
import Button from 'components/Button';
import { Context } from 'store';

import Layout from 'components/Layout';

import * as styles from './ArchivePageContainer.module.scss';

function ArchivePage({ firebase, history }) {
  const { dispatch, store } = useContext(Context);
  const authUser = useContext(AuthUserContext);

  const { roundsPlayed } = authUser;
  const { archivedRounds } = store;

  console.log({ store });
  console.log({ authUser });
  // function handleOnGameOver({ finalScore, roundId }) {
  //   if (!authUser) {
  //     dispatch({
  //       type: UPDATE_TOTAL_SCORE,
  //       payload: {
  //         totalScore: finalScore
  //       }
  //     });
  //     // TODO: take to a page where they have to sign up to persist
  //     history.push('/signup');
  //     return;
  //   }
  //   return firebase.updateUserProgress(
  //     { finalScore, authUser, roundId },
  //     () => {
  //       setTimeout(() => {
  //         dispatch({
  //           type: UPDATE_TOTAL_SCORE,
  //           payload: {
  //             totalScore: authUser.score + finalScore
  //           }
  //         });
  //         history.push('/home');
  //       }, DELAY);
  //     }
  //   );
  // }

  if (!archivedRounds) {
    return <h2>loading...</h2>;
  }

  return (
    <div data-testid='archive-page'>
      <Layout>
        <h3>Play some old shit</h3>
        {Object.keys(archivedRounds).map(round => {
          return <RoundListItem round={archivedRounds[round]} />;
        })}
      </Layout>
    </div>
  );
  return <h2>ArchivePage</h2>;
}

function RoundListItem({ round }) {
  return <Button to={`/archive/${round.roundId}`}>{round.roundName}</Button>;
}

export default compose(withFirebase, withRouter)(ArchivePage);
