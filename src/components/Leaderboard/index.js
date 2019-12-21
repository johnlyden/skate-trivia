import React from 'react';
import * as styles from './Leaderboard.module.scss';

function Leaderboard({ scores }) {
  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.headline}>Leaderboard</h2>
      {scores.map((score, i) => {
        return (
          <h3 className={styles.scoreItem} key={i}>
            {score[1]}: {score[0]}
          </h3>
        );
      })}
    </div>
  );
}

export default Leaderboard;
