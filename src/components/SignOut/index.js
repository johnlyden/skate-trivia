import React from 'react';
import { MDBNavLink } from 'mdbreact';
import { withFirebase } from 'components/Firebase';

const SignOutButton = ({ firebase }) => (
  <MDBNavLink onClick={firebase.doSignOut} to={'/'}>
    Sign Out
  </MDBNavLink>
);

export default withFirebase(SignOutButton);
