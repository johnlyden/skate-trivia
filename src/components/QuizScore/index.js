import React from "react";
import Fade from "components/Animations/Fade";

const QuizScore = ({ score }) => (
  <Fade key={score}>
    <div
      data-testid="quiz-score"
      style={{ fontSize: "0.8rem" }}
      className="points"
    >
      {score} points
    </div>
  </Fade>
);

export default QuizScore;
