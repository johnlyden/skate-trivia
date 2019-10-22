import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import ChangingProgressProvider from 'components/ChangingProgressProvider';
import { progressStyles } from './progressStyles';

import 'react-circular-progressbar/dist/styles.css';
import styles from './TimerProgress.module.scss';

function TimerProgress({ timeLimit }) {
  const arrayOfValues = [...Array(timeLimit + 1).keys()].reverse();

  return (
    <div className={styles.progressContainer} data-testid="timer">
      <ChangingProgressProvider values={arrayOfValues}>
        {percentage => {
          return (
            <CircularProgressbar
              maxValue={timeLimit}
              value={percentage}
              text={`${percentage}`}
              styles={buildStyles(progressStyles)}
            />
          );
        }}
      </ChangingProgressProvider>
    </div>
  );
}

TimerProgress.propTypes = {
  timeLimit: PropTypes.number.isRequired
};

export default TimerProgress;
