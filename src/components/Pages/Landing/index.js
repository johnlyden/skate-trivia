import React from 'react';
import logo from 'images/skatestompers.png';
import { AuthUserContext } from '../../Session';
import Button from 'components/Button';
import Layout from 'components/Layout';
import PageTitle from 'components/PageTitle';

import * as styles from './Landing.module.scss';

function Landing() {
  return (
    <Layout>
      <div className={styles.landingPage}>
        <PageTitle text='Skate Stumpers' />
        <div className={styles.logoContainer}>
          <img src={logo} alt='skate stumpers logo' />
        </div>
        <Button to='/quiz' tabIndex={1}>
          Play now
        </Button>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <Button to='/home'>Profile</Button>
            ) : (
              <Button to='/signin'>Sign In</Button>
              // <Button to="signup">Sign Up</Button>
            )
          }
        </AuthUserContext.Consumer>
        <p className={styles.subtext}>New questions daily (possibly)</p>
      </div>
    </Layout>
  );
}

export default Landing;
