import React, { MouseEvent, useState } from "react";
import TitleMenu from "../TitleMenu/TitleMenu";
import Diary from "../Diary/Diary";
import s from "./DiaryBuilder.module.css";
import axios from "../../axios-diary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Navigate } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import {
  saveDiary,
  removePost,
  diaryObj,
  diaryTitle,
  diaryTemplate,
} from "../../features/diarySlice";
import { noteId } from "../../features/readSlice";
import getNoteDate from "../../helpers/getNoteDate";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

function DiaryBuilder() {
  const title = useAppSelector(diaryTitle);
  const template = useAppSelector(diaryTemplate);
  const stateFeelings = useAppSelector(diaryObj);
  const { token, userId } = useAppSelector((state) => state.auth);
  //Переменные при редактировании поста
  const postId = useAppSelector(noteId);
  const postMillsec = useAppSelector((state) => state.read.postData.millsec);
  const postDate = useAppSelector((state) => state.read.postData.fullDate);
  const dispatch = useAppDispatch();
  const [startRemoving, setStartRemoving] = useState(false);
  const redirectPath = useAppSelector((state) => state.auth.redirectPath);

  const saveDiaryHandler = (event: MouseEvent) => {
    event.preventDefault();
    //При редактировании, удаляется старый пост и сохраняется новый, со старой датой
    if (postId) {
      dispatch(removePost({ token, postId }));
    }

    //to do may be replace all data info into slices, case here I can reduce useSelectors and
    //optimize - get rid of extra rendering

    //it was extra cicle
    // let note = {} as Record<string, string>;
    // for (let key in stateFeelings) {
    //   if (stateFeelings[key]) {
    //     note[key] = stateFeelings[key];
    //   }
    // }

    let fullDate = getNoteDate.fullDate;
    let millsec = getNoteDate.millsec;

    console.log("fullDate", fullDate);

    const diaryData = {
      note: stateFeelings,
      userId: userId,
      fullDate: postId && postDate ? postDate : fullDate,
      millsec: postId && postMillsec ? postMillsec : millsec,
    };

    //Проверка на пустой пост, такой пост не сохраняется
    if (Object.keys(stateFeelings).length > 0) {
      dispatch(saveDiary({ diaryData, token }));
    }
  };

  const removeDiaryHandler = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    if (postId) {
      dispatch(removePost({ token, postId }));
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
