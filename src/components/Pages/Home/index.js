import React, { useContext, useState, useEffect } from 'react';
import { withAuthorization } from '../../Session';
import { AuthUserContext } from '../../Session';
import Layout from 'components/Layout';
import { Context } from 'store';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
// import { homePage } from './Home.module.scss';

import cx from 'classnames';

/**
 * in here show the leaderboard?  If you are logged in, it will show your stats also, if not it will have a link to play now
 * could also have some cool stuff on this page to show how the app works
 */
function HomePage() {
  const { store } = useContext(Context);
  const { quizContent, totalScore } = store;
  const [BG, setBG] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBG(true);
    }, 500);
  });

  if (!quizContent) {
    return <h2>loading...</h2>;
  }

  // className={cx(styles.homePage, { [styles.top]: BG === true })}

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div
          className={cx(styles.homePage, { [styles.top]: BG === true })}
          style={{ height: '100vh', backgroundColor: '#e0f7bb' }}>
          <Layout>
            <div className={styles.contentContainer}>
              {/* <div>round: {quizContent.roundName}</div> */}
              {/* <div>user name: {authUser.username}</div> */}
              <div>total score: {totalScore || authUser.score}</div>
              <Link to="/quiz">TakeQuiz</Link>
            </div>
          </Layout>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => {
  return authUser && !!authUser.roles.ADMIN;
};

export default withAuthorization(condition)(HomePage);
