import React from 'react';

import { AuthUserContext } from 'components/Session';
import useContentful from './useContentful';
import QuizContainer from 'containers/QuizContainer';
import QuizTitle from 'components/QuizTitle';

import { quizHeader } from './QuizPage.module.css';

function QuizPage() {
  const { isFetching, content } = useContentful();
  // TODO: shape the round to only have what the quizContainer needs
  if (isFetching || !content) {
    return <h2>loading...</h2>;
  }

  const { name } = content.fields;

  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (
          // if the authUser has the roundId from today in gamesPlayed then render leaderboard instead of quizContainer
          <div>
            <div className={quizHeader}>
              <QuizTitle title={name} />
            </div>
            <QuizContainer round={content} authUser={authUser} />
          </div>
        )}
      </AuthUserContext.Consumer>
    </div>
  );
}

export default QuizPage;
