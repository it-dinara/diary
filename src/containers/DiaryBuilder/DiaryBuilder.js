import { useState } from "react";
import TitleMenu from "../TitleMenu/TitleMenu";
import Diary from "../Diary/Diary";
import s from "./DiaryBuilder.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios-diary.js";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Navigate } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import {
  saveDiary,
  removePost,
  diaryObj,
  diaryTitle,
  diaryTemplate,
} from "../../features/diarySlice.js";
import { noteId } from "../../features/readSlice";

function DiaryBuilder() {
  const title = useSelector(diaryTitle);
  const template = useSelector(diaryTemplate);
  const stateFeelings = useSelector(diaryObj);
  const { token, userId } = useSelector((state) => state.auth);
  //Переменные при редактировании поста
  const postId = useSelector(noteId);
  const postMillsec = useSelector((state) => state.read.postData.millsec);
  const postDate = useSelector((state) => state.read.postData.fullDate);
  const dispatch = useDispatch();
  const [startRemoving, setStartRemoving] = useState(false);
  const redirectPath = useSelector((state) => state.auth.redirectPath);

  const saveDiaryHandler = (event) => {
    event.preventDefault();
    //При редактировании, удаляется старый пост и сохраняется новый, со старой датой
    if (postId) {
      dispatch(removePost({ token, postId }));
    }

    //Проверка на пустой пост, такой пост не сохраняется
    let note = {};
    for (let key in stateFeelings) {
      if (stateFeelings[key]) {
        note[key] = stateFeelings[key];
      }
    }
    //Дата
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    const formatDate = (num) => {
      let res;
      if (num.toString().length < 2) {
        res = "0" + num;
      } else {
        res = num;
      }
      return res;
    };

    let fullDate =
      day +
      "." +
      formatDate(month + 1) +
      "." +
      year +
      " " +
      formatDate(hour) +
      ":" +
      formatDate(minutes);
    let millsec = Date.parse(date);

    const diaryData = {
      note: note,
      userId: userId,
      fullDate: postId && postDate ? postDate : fullDate,
      millsec: postId && postMillsec ? postMillsec : millsec,
    };

    if (Object.keys(note).length > 0) {
      dispatch(saveDiary({ diaryData, token }));
    }
  };

  const removeDiaryHandler = (event) => {
    event.preventDefault();

    if (postId) {
      dispatch(removePost(token, postId));
    }
  };

  let redirect = redirectPath && <Navigate to={"/posts"} />;

  let modalAlert = (
    <Modal
      show={startRemoving}
      modalClosed={() => {
        setStartRemoving(false);
      }}
    >
      <p style={{ textAlign: "center" }}>
        Are you sure you want to delete the post?
      </p>

      <div className={s.modal}>
        <button
          className={[s.buttonModal, s.cancel].join(" ")}
          onClick={(event) => {
            event.preventDefault();
            setStartRemoving(false);
          }}
        >
          cancel
        </button>
        <button
          className={[s.buttonModal, s.removePost].join(" ")}
          onClick={(event) => {
            removeDiaryHandler(event);
            setStartRemoving(false);
          }}
        >
          delete
        </button>
      </div>
    </Modal>
  );

  //в результате setTitle показывается соответствующий Textarea
  let diary = null;
  for (let item of template) {
    if (title === item) {
      diary = <Diary key={item} />;
    }
  }

  let removeButton = null;
  if (postId) {
    removeButton = (
      <button
        className={[s.button, s.removeBtn].join(" ")}
        onClick={(event) => {
          event.preventDefault();
          setStartRemoving(true);
        }}
      >
        Delete
      </button>
    );
  }
  return (
    <form action="">
      <div className={s.container}>
        <div className={s.buttons}>
          <button
            className={[s.button, s.saveBtn].join(" ")}
            onClick={(event) => saveDiaryHandler(event)}
          >
            Save
          </button>
          {removeButton}
        </div>
        <div className={s.diary}>
          <TitleMenu />
          {diary}
        </div>
        {modalAlert}
        {redirect}
      </div>
    </form>
  );
}

export default withErrorHandler(DiaryBuilder, axios);
