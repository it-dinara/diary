import React, { MouseEventHandler } from "react";

import classes from "./Button.module.css";

type ButtonProps = {
  disabled?: boolean;
  btnType: "Success" | "Danger";
  clicked?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};

const Button = (props: ButtonProps) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
