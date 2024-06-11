import React from "react";
import s from "./Spinner.module.css";

const Spinner = () => (
  <div className={s.loader}>
    <div>Loading...</div>
  </div>
);

export default Spinner;
