import s from "./start.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios-diary.js";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { noteInit } from "../../features/test/diarySlice.js";

function Start() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const redirect = useSelector((state) => state.diary.redirect);
  const redirectHandler = () => {
    dispatch(noteInit());
    navigate.push("/");
    console.log("redirect", redirect);
  };
  return (
    <div className={s.wrapper} onClick={redirectHandler}>
      <div className={s.plus}>
        <div className={s.vertical}></div>
        <div className={s.gorizontal}></div>
      </div>
    </div>
  );
}

export default withErrorHandler(Start, axios);
