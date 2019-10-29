import React from 'react';
import * as styles from './Input.module.scss';

function Input({ name, value, onChange, type, placeholder, required }) {
  return (
    <div className={styles.inputContainer}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        // placeholder={placeholder}
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}

export default Input;
