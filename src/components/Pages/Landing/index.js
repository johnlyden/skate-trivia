import React, { useContext } from 'react';
import logo from 'images/skatestompers.png';
import { AuthUserContext } from '../../Session';
import { Context } from 'store';
import Button from 'components/Button';
import Layout from 'components/Layout';

import localStorage from 'services/localStorage';
import PageTitle from 'components/PageTitle';
import * as styles from './Landing.module.scss';

function Landing() {
  const { store } = useContext(Context);
  const { quizContent } = store;
  const localData = localStorage.get('authUser') || {};
  const { roundsPlayed } = localData;

  if (!quizContent) {
    return <h2>loading...</h2>;
  }
  const { roundId: currentRound } = quizContent;

  return (
    <Layout hideLogo>
      <div className={styles.landingPage}>
        <PageTitle text='Skate Stumpers' />
        <div className={styles.logoContainer}>
          <img src={logo} alt='skate stumpers logo' />
        </div>
        <AuthUserContext.Consumer>
          {authUser => {
            const hasPlayed = roundsPlayed && roundsPlayed[currentRound];

            return (
              <>
                {hasPlayed ? (
                  <Button to='/archive'>Play an oldie</Button>
                ) : (
                  <Button to='/quiz' tabIndex={1}>
                    Play now
                  </Button>
                )}
                {authUser ? (
                  <Button to='/home'>Profile</Button>
                ) : (
                  <Button to='/signin'>Sign In</Button>
                )}
              </>
            );
          }}
        </AuthUserContext.Consumer>
        <p className={styles.subtext}>New questions daily (possibly)</p>
      </div>
    </Layout>
  );
}

export default Landing;
