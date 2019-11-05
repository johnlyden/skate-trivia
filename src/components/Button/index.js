import React from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

function Button({ children, color, disabled, onClick, size, type }) {
  const className = cx(styles.button, styles.bGreen);
  return (
    <button
      className={className}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      type={type}>
      {children}
    </button>
  );
}

export default Button;
