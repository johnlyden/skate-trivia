import React from 'react';
import PropTypes from 'prop-types';

import styles from './Question.module.css';

function Question(props) {
  return (
    <div data-testid="question-text" className={styles.question}>
      {props.content}
    </div>
  );
}
Question.propTypes = {
  content: PropTypes.string.isRequired
};
export default Question;
