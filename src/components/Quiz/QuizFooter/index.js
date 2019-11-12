import React from "react";

import TimerProgress from "components/TimerProgress";
import Fade from "components/Animations/Fade";

import * as styles from "./QuizFooter.module.scss";

function QuizFooter({ questionIndex, timeLimit }) {
  return (
    <Fade key={questionIndex}>
      <div className={styles.timerContainer}>
        <TimerProgress timeLimit={timeLimit} />
      </div>
    </Fade>
  );
}

export default QuizFooter;
