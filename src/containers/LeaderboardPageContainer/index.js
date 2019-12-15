import React, { useEffect, useContext, useState } from 'react';
import queryString from 'query-string';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { formatScores } from 'utils/helpers';
import { useParams } from 'react-router';

import { ADD_VALUES_TO_LEADERBOARD } from '../../store/actions';
import Button from 'components/Button';

import Layout from 'components/Layout';
import Leaderboard from 'components/Leaderboard';
import * as styles from './LeaderboardPageContainer.module.scss';

function LeaderboardPageContainer({ firebase }) {
  const { dispatch, store } = useContext(Context);
  const [rank, setRank] = useState(null);
  const { leaderboard } = store;

  useEffect(() => {
    // Listen for updates when leaderboard changes to update in real time
    const parsed = queryString.parse(window.location.search);

    if (parsed.rank) {
      setRank(parsed.rank);
    }
    firebase.leaderboard().on('value', snapshot => {
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

    return () => {
      firebase.leaderboard().off();
    };
  }, []);

  if (!leaderboard) {
    return null;
  }

  const scores = formatScores(leaderboard);

  return (
    <Layout>
      <div data-testid='leaderboard-page' className={styles.leaderboardPage}>
        <div>
          {rank && <h3>{rank}</h3>}
          <Leaderboard scores={scores} />
        </div>
        <Button to='/home'>Home</Button>
      </div>
    </Layout>
  );
}

export default compose(withFirebase, withRouter)(LeaderboardPageContainer);
