import React from 'react';
import PropTypes from 'prop-types';
import ChangingProgressProvider from 'components/ChangingProgressProvider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.5,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',

                // Text size
                textSize: '16px',

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
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
