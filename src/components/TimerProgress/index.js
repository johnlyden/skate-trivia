import React from 'react';
import PropTypes from 'prop-types';
import ChangingProgressProvider from 'components/ChangingProgressProvider';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './TimerProgress.module.scss';

function TimerProgress({ timeLimit }) {
  const arrayOfValues = [...Array(timeLimit + 1).keys()].reverse();

  return (
    <div className={styles.progressContainer}>
      <ChangingProgressProvider values={arrayOfValues}>
        {percentage => {
          return (
            <CircularProgressbar
              maxValue={timeLimit}
              value={percentage}
              text={`${percentage}`}
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
