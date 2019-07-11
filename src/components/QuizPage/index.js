import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Quiz from '../Quiz';

const contentful = require('contentful');

function QuizPage({ history }) {
  const [round, setRound] = useState({});
  const [roundId, setRoundId] = useState(null);
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [pointValue, setPointValue] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [score, setScore] = useState(0);

  function setNextQuestion() {
    setCounter(counter + 1);
    setQuestionId(questionId + 1);
    setQuestion(quizQuestions[counter + 1].fields.body);
    setAnswerOptions(quizQuestions[counter + 1].fields.choices);
    setCorrectAnswer(quizQuestions[counter + 1].fields.answer);
    setPointValue(quizQuestions[counter + 1].fields.pointValue);
    setTimeLimit(quizQuestions[counter + 1].fields.timeLimit);
    setAnswer('');
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      // make a request to update the firebase record
      // update firebase to have this roundId in its roundsPlayed array

      // redirect to the home/scoreboard
      setTimeout(() => history.push('/new-location'), 300);
    }
  }

  function setUserAnswer(answer) {
    setAnswer(answer);
    if (answer === correctAnswer) {
      setScore(score + pointValue);
    }
  }

  const client = contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
  });

  useEffect(() => {
    // this should get Today's quiz
    client.getEntries({ content_type: 'round' }).then(response => {
      const round = response.items[0].fields;
      const roundId = response.items[0].sys.id;
      const quizQuestions = round.questions;

      // this roundID needs to be added to an array of roundsPlayed on the user

      // if you have already played this round, show a view for that
      setQuizQuestions(quizQuestions);
      setRound(round);
      setRoundId(roundId);
      setQuestion(quizQuestions[0].fields.body);
      setAnswerOptions(quizQuestions[0].fields.choices);
      setCorrectAnswer(quizQuestions[0].fields.answer);
      setPointValue(quizQuestions[0].fields.pointValue);
      setTimeLimit(quizQuestions[0].fields.timeLimit);
    });
  }, []);

  if (!round || !round.questions) return null;

  return (
    <div>
      <h2>{round.name}</h2>
      <h2>{roundId}</h2>
      <h3>{score}</h3>
      <h3>time limit: {timeLimit}</h3>
      <h3>point value: {pointValue}</h3>

      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        timeLimit={timeLimit}
        questionId={questionId}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
      />
    </div>
  );
}

export default withRouter(QuizPage);

// export default compose(
//   withAuthorization(condition),
//   withFirebase
// )(AdminPage);
