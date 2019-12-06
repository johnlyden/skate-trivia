import React, { useEffect, useState, useContext } from 'react';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { ADD_VALUES_TO_LEADERBOARD } from '../../store/actions';

import Layout from 'components/Layout';

function LeaderboardPageContainer({ firebase }) {
  const [highScores, setHighScores] = useState(null);

  const { dispatch, store } = useContext(Context);

  // const { leaderboard } = store;j

  useEffect(() => {
    if (highScores) {
      return;
    }

    firebase.leaderboard().on('value', snapshot => {
      const leaderboardObject = snapshot.val();
      if (leaderboardObject) {
        setHighScores(leaderboardObject);
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

  return (
    <>
      <div data-testid='leaderboard-page'>
        <Layout>
          <h2>Leaderboard</h2>
          {highScores &&
            Object.keys(highScores).map(highScore => (
              <h2>
                {highScore}: {highScores[highScore]}
              </h2>
            ))}
        </Layout>
      </div>
    </>
  );
}

export default compose(withFirebase, withRouter)(LeaderboardPageContainer);
