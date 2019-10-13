import React, { useEffect, useState } from 'react';

import Quiz from 'components/Quiz';

function QuizContainer({ question, onAnswerSelected }) {
  const { answer, body, choices } = question;
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
  }, [question]);

  function handleSelect() {
    setAnswered(true);
    onAnswerSelected();
  }

  return (
    <>
      <Quiz
        answer={answer}
        answered={answered}
        onAnswerSelected={handleSelect}
        question={body}
        answerOptions={choices}
      />
    </>
  );
}

export { QuizContainer };
