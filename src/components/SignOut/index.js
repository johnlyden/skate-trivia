import React from 'react';
import { withFirebase } from 'components/Firebase';
import Button from 'components/Button';

const SignOutButton = ({ firebase }) => (
  <Button onClick={firebase.doSignOut} to={'/'}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
