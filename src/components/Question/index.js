import React from 'react';
import PropTypes from 'prop-types';

import styles from './Question.module.scss';

function Question(props) {
  return (
    <div data-testid='question-text' className={styles.question}>
      <p>{props.content}</p>
    </div>
  );
}
Question.propTypes = {
  content: PropTypes.string.isRequired,
};
export default Question;
