import React, { useEffect, useState, useContext } from 'react';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';
import { ADD_VALUES_TO_LEADERBOARD } from '../../store/actions';

import Layout from 'components/Layout';

function LeaderboardPageContainer({ firebase }) {
  const { dispatch, store } = useContext(Context);

  const { leaderboard } = store;

  useEffect(() => {
    if (leaderboard) {
      return;
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

  function formatScores(objectOfScores) {
    return Object.keys(objectOfScores)
      .map(s => [parseInt(s, 10), objectOfScores[s]])
      .sort()
      .reverse();
  }

  const scores = formatScores(leaderboard);

  return (
    <>
      <div data-testid='leaderboard-page'>
        <Layout>
          <Leaderboard scores={scores} />
        </Layout>
      </div>
    </>
  );
}

function Leaderboard({ scores }) {
  return (
    <>
      <h2>Leaderboard</h2>
      {scores.map((score, i) => {
        return (
          <h2 key={i}>
            {score[0]}: {score[1]}
          </h2>
        );
      })}
    </>
  );
}

export default compose(withFirebase, withRouter)(LeaderboardPageContainer);
