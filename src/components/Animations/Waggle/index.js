import React from "react";
import * as styles from "./Waggle.module.scss";

function Waggle({ children, key }) {
  return (
    <div key={key} className={styles.waggle}>
      {children}
    </div>
  );
}

export default Waggle;
