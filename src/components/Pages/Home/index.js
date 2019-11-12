import React, { useContext, useState, useEffect, createRef } from "react";
import Confetti from "react-confetti";
import { withAuthorization } from "../../Session";
import { AuthUserContext } from "../../Session";
import Layout from "components/Layout";
import { Context } from "store";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import SignOut from "components/SignOut";
// import { homePage } from './Home.module.scss';

import cx from "classnames";

/**
 * in here show the leaderboard?  If you are logged in, it will show your stats also, if not it will have a link to play now
 * could also have some cool stuff on this page to show how the app works
 */
function HomePage() {
  const { store } = useContext(Context);
  const { quizContent, totalScore } = store;
  const [BG, setBG] = useState(false);
  const scoreRef = createRef(null);

  useEffect(() => {
    setTimeout(() => {
      setBG(true);
    }, 500);
  });

  if (!quizContent) {
    return <h2>loading...</h2>;
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        console.log({ authUser });
        return (
          <div
            className={cx(styles.homePage, { [styles.top]: BG === true })}
            style={{ height: "100vh" }}
          >
            <Layout>
              <div className={styles.contentContainer}>
                {authUser.username && (
                  <div className={styles.circle}>
                    <h2>{authUser.username[0]}</h2>
                    <Confetti numberOfPieces={200} recycle={false} />
                  </div>
                )}
                {/* <div>round: {quizContent.roundName}</div> */}
                {/* <div>user name: {authUser.username}</div> */}
                <div ref={scoreRef}>
                  total score: {totalScore || authUser.score}
                </div>
                <Link to="/quiz">TakeQuiz</Link>
                <SignOut />
              </div>
            </Layout>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
