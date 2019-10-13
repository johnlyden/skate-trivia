import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChangingProgressProvider from 'components/ChangingProgressProvider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styles from './TimerProgress.module.scss';

function TimerProgress({ timeLimit, timeIsUp }) {
  // const [values, setValues] = useState([]);
  // useEffect(() => {
  //   if (timeLimit) {
  //     const arrayOfValues = [...Array(timeLimit + 1).keys()].reverse();
  //     setValues(arrayOfValues);
  //   }
  // }, [timeIsUp]);

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
              styles={buildStyles({
                rotation: 0.5,
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `#000`,
                textColor: '#000',
                trailColor: '#fff',
                backgroundColor: '#3e98c7'
              })}
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
