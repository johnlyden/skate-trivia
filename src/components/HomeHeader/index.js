import React from 'react';
import * as styles from './HomeHeader.module.scss';

function HomeHeader({ name }) {
  const firstLetter = name[0];
  return (
    <div className={styles.headerContainer}>
      <div className={styles.circle}>
        <h2>{firstLetter}</h2>
      </div>
      <h3 className={styles.heading}>{name}</h3>
    </div>
  );
}

export default HomeHeader;
