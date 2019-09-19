import React, { useContext } from 'react';
import { withAuthorization } from '../../Session';
import { AuthUserContext } from '../../Session';
import { Context } from 'store';

/**
 * in here show the leaderboard?  If you are logged in, it will show your stats also, if not it will have a link to play now
 * could also have some cool stuff on this page to show how the app works
 */
function HomePage() {
  const { store } = useContext(Context);
  const { quizContent, totalScore } = store;

  if (!quizContent) {
    return <h2>loading...</h2>;
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <div>round: {quizContent.roundName}</div>
          <div>user name: {authUser.username}</div>
          <div>total score: {totalScore || authUser.score}</div>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => {
  return authUser && !!authUser.roles.ADMIN;
};

export default withAuthorization(condition)(HomePage);
