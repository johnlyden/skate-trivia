import React, { useEffect, useState } from 'react';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';

function LeaderboardPageContainer({ firebase }) {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    console.log('leaderboad useeffect');
    firebase.leaderboard().on('value', snapshot => {
      const leaderboardObject = snapshot.val();
      if (leaderboardObject) {
        console.log({ leaderboardObject });
        setLeaderboard(leaderboardObject);
      }
    });

    return () => {
      firebase.leaderboard().off();
    };
  }, []);

  if (!leaderboard) {
    return null;
  }
  return (
    <>
      {/* {leaderboard} */}
      <h2>LeaderboardPageContainer</h2>
    </>
  );
}

export default compose(withFirebase, withRouter)(LeaderboardPageContainer);
