import React, { useContext, useState, useEffect, createRef } from 'react';
import { withAuthorization } from '../../Session';
import { AuthUserContext } from '../../Session';
import Layout from 'components/Layout';
import { Context } from 'store';
import styles from './Home.module.scss';
import SignOut from 'components/SignOut';
import Button from 'components/Button';
import HomeHeader from 'components/HomeHeader';
import localStorage from 'services/localStorage';
import cx from 'classnames';

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
    allContent = { [quizContent['roundId']]: quizContent };
  }

  if (archivedRounds) {
    allContent = { ...allContent, ...archivedRounds };
  }

  const localData = localStorage.get('authUser');
  const { roundsPlayed } = localData;

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        const hasPlayed =
          localData.roundsPlayed && localData.roundsPlayed[currentRound];

        return (
          <div className={styles.HomePage} style={{ height: '100vh' }}>
            <Layout>
              <div className={styles.contentContainer}>
                {authUser && authUser.username && (
                  <>
                    <HomeHeader
                      name={authUser.username}
                      totalScore={totalScore || authUser.score}
                    />
                  </>
                )}

                <div className={styles.ctaSection}>
                  {hasPlayed && (
                    <>
                      <p className={styles.text}>
                        Damn, you've played the latest round
                      </p>
                      <p className={styles.smallText}>
                        keep an eye out for the next one
                      </p>
                    </>
                  )}
                  {!hasPlayed ? (
                    <Button to='/quiz'>Play latest</Button>
                  ) : (
                    <Button to='/archive'>Play an oldie</Button>
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  <Button to='/leaderboard'>Leaderboard</Button>
                  <SignOut />
                </div>
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
