import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './Button.module.scss';

function Button({
  children,
  color,
  disabled,
  onClick,
  size,
  type,
  to,
  ...extraProps
}) {
  const className = cx(styles.button, styles.bGreen);

  const handleClick = event => {
    if (onClick) {
      onClick(event);
    }
  };

  if (to) {
    return (
      <Link to={to} onClick={handleClick} {...extraProps} className={className}>
        {children}
      </Link>
    );
  }

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
