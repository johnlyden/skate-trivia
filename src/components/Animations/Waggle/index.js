import React from 'react';
import * as styles from './Waggle.module.scss';

function Waggle({ children, id }) {
  return (
    <div key={id} className={styles.waggle}>
      {children}
    </div>
  );
}

export default Waggle;
