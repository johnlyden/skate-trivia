import React from 'react';

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

export default Leaderboard;
