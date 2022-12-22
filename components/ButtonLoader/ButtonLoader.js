import React from "react";
import styles from "./ButtonLoader.module.css";

const ButtonLoader = () => {
  return (
    <>
      <h4>Loading</h4>
      <span className={styles.loader}></span>
    </>
  );
};

export default ButtonLoader;
