import React from "react";
import * as styles from "./Input.module.scss";

function Input({ name, value, onChange, type, placeholder, required, label }) {
  return (
    <div className={styles.input}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder}
        data-testid={`${name}-input`}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Input;
