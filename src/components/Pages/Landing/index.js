import React from 'react';
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
      </Layout>
    </div>
  );
}

export default Landing;

{
  /* <div className={quizPage}>
  <Layout>
    <QuizContainer
      onGameOver={handleOnGameOver}
      quizContent={quizContent}
      authUser={authUser}
    />
  </Layout>
</div>; */
}
