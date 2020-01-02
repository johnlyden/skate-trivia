import React from 'react';
import styles from './Logo.module.scss';
import logo from 'images/skatestompers.png';
import { Link } from 'react-router-dom';

export function Logo({ bottomPlacement }) {
  return (
    <div
      className={`${styles.logoContainer} ${bottomPlacement && styles.bottom}`}
    >
      <Link to='/'>
        <img src={logo} alt='skate stumpers logo' />
      </Link>
    </div>
  );
}

export default Logo;
