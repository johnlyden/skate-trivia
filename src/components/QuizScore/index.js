import React from 'react';

const QuizScore = ({ score }) => (
  <h3
    style={{ fontWeight: '500', marginBottom: '0', fontSize: '1rem' }}
    className="points">
    {score} points
  </h3>
);

export default QuizScore;
