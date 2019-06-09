import React, { useEffect, useState } from 'react';
import Question from '../Question';
const contentful = require('contentful');

function Landing() {
  const [round, setRound] = useState({});

  const client = contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
  });

  useEffect(() => {
    // this should get Today's quiz
    client.getEntries({ content_type: 'round' }).then(response => {
      const round = response.items[0].fields;
      setRound(round);
    });
  }, []);

  if (!round || !round.questions) return null;

  return (
    <div>
      <h2>{round.name}</h2>
      {round.questions.map(question => (
        <Question content={question.fields.body} />
      ))}
    </div>
  );
}

export default Landing;
