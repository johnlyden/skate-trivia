import React from 'react';
import * as styles from './PageTitle.module.scss';

function PageTitle({ text }) {
  return <h2 className={styles.title}>{text}</h2>;
}

export default PageTitle;
