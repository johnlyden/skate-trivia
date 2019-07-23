import React from 'react';
import PropTypes from 'prop-types';
import ChangingProgressProvider from '../ChangingProgressProvider';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TimerProgress({ timeLimit }) {
  const arrayOfValues = [...Array(timeLimit + 1).keys()].reverse();

  return (
    <div style={{ width: '20%' }}>
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
