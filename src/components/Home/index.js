import React from 'react';
import { withAuthorization } from '../Session';

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
