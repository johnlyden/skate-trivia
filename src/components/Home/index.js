import React from 'react';
import { withAuthorization } from '../Session';

/**
 * in here show the leaderboard?  If you are logged in, it will show your stats also, if not it will have a link to play now
 * could also have some cool stuff on this page to show how the app works
 */
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => {
  return authUser && !!authUser.roles.ADMIN;
};

export default withAuthorization(condition)(HomePage);
