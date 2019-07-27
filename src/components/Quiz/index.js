import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import AnswerOption from 'components/AnswerOption';
import Question from 'components/Question';
import QuestionCount from 'components/QuestionCount';
import { withFirebase } from 'components/Firebase';
import TimerProgress from 'components/TimerProgress';
import { compose } from 'recompose';

function Quiz(props) {
  const { questionData, onAnswerSelected, quizLength } = props;
  const { question, answerOptions, timeLimit, questionId } = questionData;

  return (
    <div data-testid="quiz">
      <CSSTransitionGroup
        className="container"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        key={question}
        transitionAppearTimeout={500}>
        {timeLimit && (
          <TimerProgress timeLimit={timeLimit} data-testid="timer" />
        )}
        <QuestionCount
          currentQuestion={questionId}
          quizLength={quizLength}
          data-testid="question-count"
        />
        <Question content={question} />
        <ul className="answerOptions">
          {answerOptions.map((option, i) => {
            return (
              <AnswerOption
                data-testid={`answer-option-${i}`}
                onAnswerSelected={onAnswerSelected}
                answerContent={option}
                key={option}
              />
            );
          })}
        </ul>
      </CSSTransitionGroup>
    </div>
  );
}

export default compose(
  withRouter,
  withFirebase
)(Quiz);
