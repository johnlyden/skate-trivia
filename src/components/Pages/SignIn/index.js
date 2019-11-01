import React from 'react';

import Layout from 'components/Layout';
import { SignUpLink } from 'components/Pages/SignUp';
import { PasswordForgetLink } from 'components/Pages/PasswordForget';
import SignInForm from 'containers/SignInContainer';

const SignInPage = () => (
  <div>
    <Layout>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Layout>
  </div>
);

export default SignInPage;
