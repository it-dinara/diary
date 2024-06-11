import React from "react";

import classes from "./Backdrop.module.css";

type BackdropProps = { show: boolean; clicked: () => void };

const Backdrop = (props: BackdropProps) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default Backdrop;
