import React from 'react';
import { withAuthorization } from '../Session';
import { AuthUserContext } from '../Session';
/**
 * in here show the leaderboard?  If you are logged in, it will show your stats also, if not it will have a link to play now
 * could also have some cool stuff on this page to show how the app works
 */
function HomePage() {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <div>user name: {authUser.username}</div>
          <div>total score: {authUser.totalScore}</div>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => {
  return authUser && !!authUser.roles.ADMIN;
};

export default withAuthorization(condition)(HomePage);
