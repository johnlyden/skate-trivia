import React from 'react';

import Layout from 'components/Layout';
import { SignUpLink } from 'containers/SignUpContainer';
import { PasswordForgetLink } from 'components/Pages/PasswordForget';
import SignInForm from 'containers/SignInContainer';

import styles from './SignIn.module.scss';

const SignInPage = () => (
  <div>
    <Layout>
      <p className={styles.headline}>Sign in</p>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Layout>
  </div>
);

export default SignInPage;
