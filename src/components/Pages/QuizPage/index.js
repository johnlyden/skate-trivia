import React from 'react';
import QuizContainer from 'containers/QuizContainer';
import { AuthUserContext } from 'components/Session';
import useContentful from './useContentful';

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
            <h2>{name}</h2>
            <QuizContainer round={content} authUser={authUser} />
          </div>
        )}
      </AuthUserContext.Consumer>
    </div>
  );
}

export default QuizPage;
