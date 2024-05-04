import React, { useState, useEffect } from "react";
import s from "./TitleMenu.module.css";
import Title from "./Title/Title";
import { useSelector, useDispatch } from "react-redux";
import { diaryTemplate, setTitle } from "../../features/diarySlice.js";
import { noteId } from "../../features/readSlice.js";

const TitleMenu = React.memo(() => {
  const postNote = useSelector((state) => state.read.postData.note);
  const postId = useSelector(noteId);
  const template = useSelector(diaryTemplate);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const setTitleHandler = (event, title) => {
    event.preventDefault();
    setActive((active) => {
      return { [title]: !active[title] };
    });
    return dispatch(setTitle(title));
  };

  useEffect(() => {
    if (!postId) {
      dispatch(setTitle(template[0]));
      setActive({ [template[0]]: true });
    } else {
      for (let title of template) {
        if (Object.keys(postNote).includes(title)) {
          dispatch(setTitle(title));
          setActive({ [title]: true });
          break;
        }
      }
    }
  }, [postId, template, postNote, dispatch]);

  return (
    <ul className={s.titleMenu}>
      {template.map((title) => (
        <Title
          key={title}
          name={title}
          clicked={(event) => setTitleHandler(event, title)}
          active={active[title]}
        />
      ))}
    </ul>
  );
});

export default TitleMenu;
