import React, { useEffect, useState } from 'react';
import QuizContainer from 'components/QuizContainer';
import { AuthUserContext } from 'components/Session';

const contentful = require('contentful');

function QuizPage() {
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

  // TODO: shape the round to only have what the quizContainer needs
  if (!round) return null;
  const { name } = round.fields;
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h2>{name}</h2>
            <QuizContainer round={round} />
          </div>
        )}
      </AuthUserContext.Consumer>
    </div>
  );
}

export default QuizPage;
