import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import QuizContainer from 'components/QuizContainer';
import { withFirebase } from 'components/Firebase';
import { AuthUserContext } from 'components/Session';
import { compose } from 'recompose';

const contentful = require('contentful');

function QuizPage({ history, firebase, authUser }) {
  const [round, setRound] = useState(null);

  const client = contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
  });

  useEffect(() => {
    client.getEntries({ content_type: 'round' }).then(response => {
      const round = response.items[0];
      setRound(round);
    });
  }, []);

  if (!round) return null;

  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h2>{round.name}</h2>
            <QuizContainer round={round} authUser={authUser} />
          </div>
        )}
      </AuthUserContext.Consumer>
    </div>
  );
}

export default compose(
  withRouter,
  withFirebase
)(QuizPage);
