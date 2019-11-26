import React, { useContext } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { AuthUserContext } from 'components/Session';
import { withFirebase } from 'components/Firebase';
import { Context } from 'store';

import Layout from 'components/Layout';

function ArchivePage({ firebase, history }) {
  // const { dispatch, store } = useContext(Context);
  // const authUser = useContext(AuthUserContext);

  // const { quizContent } = store;

  // function handleOnGameOver({ finalScore, roundId }) {
  //   if (!authUser) {
  //     dispatch({
  //       type: UPDATE_TOTAL_SCORE,
  //       payload: {
  //         totalScore: finalScore
  //       }
  //     });
  //     // TODO: take to a page where they have to sign up to persist
  //     history.push('/signup');
  //     return;
  //   }
  //   return firebase.updateUserProgress(
  //     { finalScore, authUser, roundId },
  //     () => {
  //       setTimeout(() => {
  //         dispatch({
  //           type: UPDATE_TOTAL_SCORE,
  //           payload: {
  //             totalScore: authUser.score + finalScore
  //           }
  //         });
  //         history.push('/home');
  //       }, DELAY);
  //     }
  //   );
  // }

  // return (
  //   <div className={quizPage} data-testid="quiz-page">
  //     <Layout>
  //       {quizContent ? (
  //         <QuizContainer
  //           onGameOver={handleOnGameOver}
  //           quizContent={quizContent}
  //           authUser={authUser}
  //         />
  //       ) : (
  //         <LoadingSpinner />
  //       )}
  //     </Layout>
  //   </div>
  // );
  return <h2>ArchivePage</h2>;
}

export default compose(withFirebase, withRouter)(ArchivePage);
