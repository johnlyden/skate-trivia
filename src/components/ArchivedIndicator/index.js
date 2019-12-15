import React from 'react';
import * as styles from './ArchivedIndicator.module.scss';

function ArchivedIndicator({ archivedDate }) {
  return (
    <>
      {/* <h3 className={styles.preHeadline}>originally released on </h3> */}
      <h2 className={styles.headline}>{archivedDate}</h2>
      <p className={styles.subHeadline}>you won't get points for this</p>
    </>
  );
}

export default ArchivedIndicator;
