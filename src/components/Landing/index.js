import React, { useEffect, useState } from 'react';
// import Question from '../Question';
import Quiz from '../Quiz';
import quizQuestions from '../../api/quizQuestions.js';

const contentful = require('contentful');

function Landing() {
  const [round, setRound] = useState({});
  const [answer, setAnswer] = useState('');
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [answersCount, setAnswersCount] = useState({});
  const [result, setResult] = useState('');

  function setNextQuestion() {
    setCounter(counter + 1);
    setQuestionId(questionId + 1);
    setQuestion(quizQuestions[counter].question);
    setAnswerOptions(quizQuestions[counter].answers);
    setAnswer('');
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
    debugger;
    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      setTimeout(() => setResults(getResults()), 300);
    }
  }

  function getResults() {
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  function setResults(result) {
    if (result.length === 1) {
      setResult(result[0]);
    } else {
      setResult('Undetermined');
    }
  }

  function setUserAnswer(answer) {
    setAnswersCount({
      ...answersCount,
      [answer]: (answersCount[answer] || 0) + 1
    });
    setAnswer(answer);
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

      setRound(round);
      setQuestion(quizQuestions[0].fields.body);
      setAnswerOptions(quizQuestions[0].fields.choices);
    });

    // const shuffledAnswerOptions = quizQuestions.map(question =>
    //   shuffleArray(question.answers)
    // );
  }, []);

  if (!round || !round.questions) return null;
  console.log(answerOptions);

  return (
    <div>
      <h2>{round.name}</h2>
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionId={questionId}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
      />
      {/* {round.questions.map(question => (
        <Question content={question.fields.body} />
      ))} */}
    </div>
  );
}

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export default Landing;
