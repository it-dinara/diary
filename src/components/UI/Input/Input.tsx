import React from "react";
import classes from "./Input.module.css";

type InputProps<T> = {
  elementType: "input" | "textarea" | "select";
  invalid: boolean;
  shouldValidate: T;
  touched: boolean;
  label?: string;
  id: string;
  value: string;
  for: string;
  changed: (event: any) => void;
  elementConfig: {
    options?: [
      {
        value: string;
        displayValue: string;
      }
    ];

    type: string;
    placeholder: string;
  };
};

const Input = <T,>(props: InputProps<T>) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          id={props.id}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor={props.id}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
