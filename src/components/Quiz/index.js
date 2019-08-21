import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import AnswerOption from 'components/AnswerOption';
import Question from 'components/Question';
import QuestionCount from 'components/QuestionCount';
import TimerProgress from 'components/TimerProgress';

function Quiz(props) {
  const { questionData, onAnswerSelected } = props;
  const {
    question,
    answerOptions,
    timeLimit,
    questionId,
    questionLibrary
  } = questionData;

  const quizLength = questionLibrary.length;

  console.log(questionData);
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
        <TimerProgress timeLimit={timeLimit} data-testid="timer" />
        <QuestionCount
          currentQuestion={questionId + 1}
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

export default Quiz;
