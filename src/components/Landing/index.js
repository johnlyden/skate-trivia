import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Quiz from '../Quiz';
const contentful = require('contentful');

function Landing({ history }) {
  const [round, setRound] = useState({});
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [pointvalue, setPointValue] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [score, setScore] = useState(0);

  function setNextQuestion() {
    setCounter(counter + 1);
    setQuestionId(questionId + 1);
    setQuestion(quizQuestions[counter + 1].fields.body);
    setAnswerOptions(quizQuestions[counter + 1].fields.choices);
    setCorrectAnswer(quizQuestions[counter + 1].fields.answer);
    setPointValue(quizQuestions[counter + 1].fields.pointvalue);
    setTimeLimit(quizQuestions[counter + 1].fields.timeLimit);
    setAnswer('');
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      setTimeout(() => history.push('/new-location'), 300);
      // getResults();
      // setTimeout(() => setResults(getResults()), 500);
      // this should:
      // add up the points earned
      // update the record in firebase
      // redirect to the scoreboard with updated results
    }
  }

  function setUserAnswer(answer) {
    // this shouldkeep track of the question, answer and points associated with each question
    setAnswer(answer);
    if (answer === correctAnswer) {
      // add points ot the points total
      setScore(score + 1);
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
      const quizQuestions = round.questions;
      setQuizQuestions(quizQuestions);
      setRound(round);
      setQuestion(quizQuestions[0].fields.body);
      setAnswerOptions(quizQuestions[0].fields.choices);
      setCorrectAnswer(quizQuestions[0].fields.answer);
      setPointValue(quizQuestions[0].fields.pointvalue);
      setTimeLimit(quizQuestions[0].fields.timeLimit);
    });
  }, []);

  if (!round || !round.questions) return null;

  return (
    <div>
      <h2>{round.name}</h2>
      <h3>{score}</h3>
      <h3>time limit: {timeLimit}</h3>
      <h3>point value: {pointvalue}</h3>
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionId={questionId}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
      />
    </div>
  );
}

export default withRouter(Landing);
