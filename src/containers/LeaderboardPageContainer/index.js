import React, { useEffect, useContext } from 'react';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { formatScores } from 'utils/helpers';

import { ADD_VALUES_TO_LEADERBOARD } from '../../store/actions';

import Layout from 'components/Layout';
import Leaderboard from 'components/Leaderboard';

function LeaderboardPageContainer({ firebase }) {
  const { dispatch, store } = useContext(Context);

  const { leaderboard } = store;

  useEffect(() => {
    // don't attach listener if we already have the data
    // if (leaderboard) {
    //   return;
    // }

    // Listen for updates when leaderboard changes to update in real time
    firebase.leaderboard().on('value', snapshot => {
      const leaderboardObject = snapshot.val();

      if (leaderboardObject) {
        console.log({ leaderboardObject });
        dispatch({
          type: ADD_VALUES_TO_LEADERBOARD,
          payload: {
            leaderboard: leaderboardObject,
          },
        });
      }
    });

    return () => {
      firebase.leaderboard().off();
    };
  }, []);

  if (!leaderboard) {
    return null;
  }

  const scores = formatScores(leaderboard);

  return (
    <div data-testid='leaderboard-page'>
      <Layout>
        <Leaderboard scores={scores} />
      </Layout>
    </div>
  );
}

export default compose(withFirebase, withRouter)(LeaderboardPageContainer);
