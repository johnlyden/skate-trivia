import React from "react";
import QuestionCount from "components/QuestionCount";
import QuizTitle from "components/QuizTitle";
import QuizScore from "components/QuizScore";
import { quizHeader, imageContainer } from "./QuizHeader.module.scss";
import logo from "images/skate-stumpers-1.jpg";

function QuizHeader({ title, score, questionIndex, quizLength }) {
  return (
    <div className={quizHeader}>
      {/* <QuizTitle title={title} /> */}
      <QuestionCount currentQuestion={questionIndex} quizLength={quizLength} />
      <QuizScore score={score} />
    </div>
  );
}

export default QuizHeader;
