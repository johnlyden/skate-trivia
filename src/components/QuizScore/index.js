import React from 'react';
import Fade from 'components/Animations/Fade';

const QuizScore = ({ score }) => (
  <Fade key={score}>
    <h3
      style={{ fontWeight: '500', marginBottom: '0', fontSize: '1rem' }}
      className="points">
      {score} points
    </h3>
  </Fade>
);

export default QuizScore;
