import React from 'react';
import { Link } from 'react-router-dom';
import QuestionCount from 'components/QuestionCount';
import QuizTitle from 'components/QuizTitle';
import QuizScore from 'components/QuizScore';
import styles, { quizHeader } from './QuizHeader.module.scss';
import logo from 'images/skatestompers.png';
import Move from 'components/Animations/Move';

function QuizHeader({ title, score, questionIndex, quizLength, showScore }) {
  return (
    <div className={quizHeader}>
      {/* <QuizTitle title={title} /> */}
      <QuestionCount currentQuestion={questionIndex} quizLength={quizLength} />
      <Logo />
      {showScore && <QuizScore score={score} />}
    </div>
  );
}

function Logo() {
  return (
    <Move>
      <Link to='/'>
        <div className={styles.logoContainer}>
          <img src={logo} alt='skate stumpers logo' />
        </div>
      </Link>
    </Move>
  );
}

export default QuizHeader;
