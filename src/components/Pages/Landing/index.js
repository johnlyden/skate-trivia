import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/skatestompers.png';
import Layout from 'components/Layout';

import * as styles from './Landing.module.scss';

function Landing() {
  return (
    <div className={styles.landingPage}>
      <Layout>
        <h2>Daily Skate Trivia</h2>
        <div className={styles.logoContainer}>
          <img src={logo} alt="skate stumpers logo" />
        </div>
        <Link to="/quiz">TakeQuiz</Link>
        <br />
        <Link to="/signin">Sign In</Link>
      </Layout>
    </div>
  );
}

export default Landing;
