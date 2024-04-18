import React, { useState, useEffect } from "react";
import s from "./TitleMenu.module.css";
import Title from "./Title/Title";
import { useSelector, useDispatch } from "react-redux";
import {
  diaryTemplate,
  setTitle,
  titleArr,
} from "../../features/diarySlice.js";
import { noteId } from "../../features/readSlice.js";

const TitleMenu = React.memo(() => {
  const titleArray = useSelector(titleArr);
  const postNote = useSelector((state) => state.read.postData.note);
  const postId = useSelector(noteId);
  const template = useSelector(diaryTemplate);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const setTitleHandler = (event, title, id) => {
    event.preventDefault();
    setActive((active) => {
      return { [title]: !active[title] };
    });
    return dispatch(setTitle(title));
  };

  useEffect(() => {
    if (!postId) {
      dispatch(setTitle(titleArray[0].name));
      setActive({ [titleArray[0].name]: true });
    } else {
      for (let title of template) {
        if (Object.keys(postNote).includes(title)) {
          dispatch(setTitle(title));
          setActive({ [title]: true });
          break;
        }
      }
    }
  }, [postId, titleArray, template, postNote, dispatch]);

  return (
    <ul className={s.titleMenu}>
      {titleArray.map((title, i) => (
        <Title
          key={title.id}
          name={title.name}
          clicked={(event) => setTitleHandler(event, title.name, title.id)}
          active={active[title.name]}
        />
      ))}
    </ul>
  );
});

export default TitleMenu;
