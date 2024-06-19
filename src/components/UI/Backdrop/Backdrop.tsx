import classes from "./Backdrop.module.css";
import { AxiosError } from "axios";

type BackdropProps = { show: boolean | null | AxiosError; clicked: () => void };

const Backdrop = (props: BackdropProps) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default Backdrop;
