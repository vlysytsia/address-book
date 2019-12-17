import React from "react";
import styles from "./loading.module.css";

const Loader = () => (
  <div className={styles.loading}>
    LOADING
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);

export default Loader;
