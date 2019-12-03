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
        <PageTitle>Skate Stompers</PageTitle>
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
        <p style={{ textAlign: 'center', color: '#fff' }}>
          New quiz everyday, bich
        </p>
      </div>
    </Layout>
  );
}

export default Landing;
