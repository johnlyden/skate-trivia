import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import AnswerOption from '../AnswerOption';
import Question from '../Question';
import QuestionCount from '../QuestionCount';
import { withFirebase } from '../Firebase';
import TimerProgress from '../TimerProgress';
import { compose } from 'recompose';

function Quiz(props) {
  const { questionData, onAnswerSelected } = props;
  const {
    question,
    answerOptions,
    timeLimit,
    questionId,
    quizLength
  } = questionData;

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      key={question}
      transitionAppearTimeout={500}>
      {timeLimit && <TimerProgress timeLimit={timeLimit} />}
      <QuestionCount currentQuestion={questionId} quizLength={quizLength} />
      <Question content={question} />
      <ul className="answerOptions">
        {answerOptions.map((option, i) => {
          return (
            <AnswerOption
              onAnswerSelected={onAnswerSelected}
              answerContent={option}
              key={option}
            />
          );
        })}
      </ul>
    </CSSTransitionGroup>
  );
}

export default compose(
  withRouter,
  withFirebase
)(Quiz);
