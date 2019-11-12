import React, { useContext, useState, useEffect, createRef } from "react";
import Confetti from "react-dom-confetti";
import { withAuthorization } from "../../Session";
import { AuthUserContext } from "../../Session";
import Layout from "components/Layout";
import { Context } from "store";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import SignOut from "components/SignOut";
// import { homePage } from './Home.module.scss';

import cx from "classnames";

const config = {
  angle: 90,
  spread: "69",
  startVelocity: 45,
  elementCount: "101",
  dragFriction: 0.1,
  duration: "3690",
  stagger: 0,
  width: "30px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

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
        return (
          <div
            className={cx(styles.homePage, { [styles.top]: BG === true })}
            style={{ height: "100vh" }}
          >
            <Layout>
              {/* <Confetti numberOfPieces={200} recycle={false} /> */}
              <div className={styles.contentContainer}>
                <Confetti config={config} active={BG} />
                {authUser && authUser.username && (
                  <div className={styles.circle}>
                    <h2>{authUser.username[0]}</h2>
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
