import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { AxiosError } from "axios";

type ModalProps = {
  children: React.ReactNode;
  show: boolean | null | AxiosError;
  modalClosed: () => void;
};

const Modal = React.memo((props: ModalProps) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
});

export default Modal;
