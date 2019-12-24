import React from 'react';
import * as styles from './Move.module.scss';

function Move({ children, id }) {
  return (
    <div key={id} className={styles.Move}>
      {children}
    </div>
  );
}

export default Move;
