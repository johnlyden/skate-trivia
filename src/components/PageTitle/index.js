import React from 'react';
import * as styles from './PageTitle.module.scss';

function PageTitle({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export default PageTitle;
