import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import AnswerOption from '../AnswerOption';
import Question from '../Question';
import QuestionCount from '../QuestionCount';
import { withFirebase } from '../Firebase';
import TimerProgress from '../TimerProgress';

function Quiz(props) {
  const { round } = props;
  const roundId = round.sys.id;
  const quizQuestions = round.fields.questions;
  const questionTotal = quizQuestions.length;
  // const [roundId, setRoundId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionId, setQuestionId] = useState(1);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [pointValue, setPointValue] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // setRoundId(roundId);
    setQuestion(quizQuestions[0].fields.body);
    setAnswer('');
    setAnswerOptions(quizQuestions[0].fields.choices);
    setCorrectAnswer(quizQuestions[0].fields.answer);
    setPointValue(quizQuestions[0].fields.pointValue);
    setTimeLimit(quizQuestions[0].fields.timeLimit);
  }, []);

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
      /** calling set overrides all props set on this user
       *
       * need to just update the score prop here insteadj
       */
      // return props.firebase
      //   .user(props.authUser.uid)
      //   .set({
      //     testingProp: 'hi There'
      //   })
      //   .then(authUser => {
      //     debugger;
      //   })
      //   .catch(error => {
      //     this.setState({ error });
      //   });
      // redirect to the home/scoreboard
      // setTimeout(() => history.push('/new-location'), 300);
    }
  }

  function setUserAnswer(answer) {
    setAnswer(answer);
    if (answer === correctAnswer) {
      setScore(score + pointValue);
    }
  }

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        answerType={key}
        answer={answer}
        questionId={questionId}
        onAnswerSelected={handleAnswerSelected}
      />
    );
  }

  return (
    <>
      <h2>{roundId}</h2>
      <h2>{score}</h2>
      <CSSTransitionGroup
        className="container"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}>
        <div className="quiz" key={questionId}>
          <TimerProgress timeLimit={timeLimit} />
          <QuestionCount counter={questionId} total={questionTotal} />
          <Question content={question} />
          <ul className="answerOptions">
            {answerOptions.map(renderAnswerOptions)}
          </ul>
        </div>
      </CSSTransitionGroup>
    </>
  );
}

Quiz.propTypes = {
  // answer: PropTypes.string.isRequired,
  // answerOptions: PropTypes.array.isRequired,
  // question: PropTypes.string.isRequired,
  // questionId: PropTypes.number.isRequired,
  // questionTotal: PropTypes.number.isRequired,
  // onAnswerSelected: PropTypes.func.isRequired
};

export default withFirebase(Quiz);
