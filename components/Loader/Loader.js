import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <h4>Loading</h4>
      <span className={styles.loader}></span>
    </>
  );
};

export default Loader;
