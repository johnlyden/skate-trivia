import React from 'react';
import * as styles from './SignUpHeader.module.scss';

function SignUpHeader({ score }) {
  if (score) {
    return (
      <>
        <p className={styles.text}>
          you scored <span>{score}</span> points
        </p>
        <p className={styles.text}>sign up or sign in to keep it goin</p>
      </>
    );
  }
  return <p className={styles.headline}>Sign up</p>;
}

export default SignUpHeader;
