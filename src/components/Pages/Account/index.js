import React from 'react';

import { AuthUserContext, withAuthorization } from '../../Session';
import Layout from 'components/Layout';
import PasswordChangeForm from 'containers/PasswordChangeContainer';

const Account = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <Layout>
            <div>
              <h2 style={{ marginBottom: '24px' }}>{authUser.email}</h2>
              <p>Change your password</p>
              <PasswordChangeForm />
            </div>
          </Layout>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
