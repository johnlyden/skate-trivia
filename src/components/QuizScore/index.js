import React from "react";
import Waggle from "components/Animations/Waggle";

const QuizScore = ({ score }) => (
  <Waggle key={score}>
    <div
      data-testid="quiz-score"
      style={{ fontSize: "0.8rem" }}
      className="points"
    >
      {score} points
    </div>
  </Waggle>
);

export default QuizScore;
