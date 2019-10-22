import React, { useContext } from 'react';

import { AuthUserContext, withAuthorization } from '../../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { Context } from 'store';
const Account = () => {
  const { store } = useContext(Context);

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
          <h2>past rounds:</h2>
          {Object.keys(authUser.roundsPlayed).map(round => (
            <h3>
              {round}: {authUser.roundsPlayed[round]}
            </h3>
          ))}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
