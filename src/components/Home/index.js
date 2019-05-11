import React from 'react';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => {
  debugger;
  return authUser && !!authUser.roles.ADMIN;
};

export default withAuthorization(condition)(HomePage);
