import React, { useContext, useState, useEffect, createRef } from "react";
import Confetti from "react-dom-confetti";
import { withAuthorization } from "../../Session";
import { AuthUserContext } from "../../Session";
import Layout from "components/Layout";
import { Context } from "store";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import SignOut from "components/SignOut";
import Button from "components/Button";

import cx from "classnames";

const config = {
  angle: 90,
  spread: "69",
  startVelocity: 45,
  elementCount: "100",
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
  const { quizContent, totalScore, archivedRounds } = store;
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

  const { roundId: currentRound } = quizContent;

  let allContent = {};

  if (quizContent) {
    allContent = { [quizContent["roundId"]]: quizContent };
  }

  if (archivedRounds) {
    allContent = { ...allContent, ...archivedRounds };
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <div
            className={styles.HomePage}
            // className={cx(styles.homePage, { [styles.top]: BG === true })}
            style={{ height: "100vh" }}
          >
            <Layout>
              <div className={styles.contentContainer}>
                <div>
                  <h3>Leaderboard</h3>
                </div>
                {totalScore && <Confetti config={config} active={BG} />}
                {authUser && authUser.username && (
                  <div className={styles.circle}>
                    <h2>{authUser.username[0]}</h2>
                  </div>
                )}
                <div ref={scoreRef}>
                  Current score: {totalScore || authUser.score}
                </div>

                {/* {!!authUser.roundsPlayed[currentRound] && (
                  <Button to="/quiz">Play Today</Button>
                )} */}

                {/* <Button to="/leaderboard">Leaderboard</Button> */}

                <SignOut />

                {/* <h2>Past Rounds</h2>
                <ul>
                  {authUser.roundsPlayed &&
                    archivedRounds &&
                    Object.keys(authUser.roundsPlayed).map(round => {
                      return (
                        <li>
                          {allContent[round]
                            ? `${allContent[round].roundName} : ${authUser.roundsPlayed[round]}`
                            : null}
                        </li>
                      );
                    })}
                </ul> */}
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
