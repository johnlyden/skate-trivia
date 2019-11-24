import React from "react";
import Waggle from "components/Animations/Waggle";

import * as styles from "./QuizScore.module.scss";

const QuizScore = ({ score }) => (
  <Waggle id={score}>
    <div data-testid="quiz-score" className={styles.score}>
      {score} points
    </div>
  </Waggle>
);

export default QuizScore;
