import React, { useState, useEffect } from "react";
import s from "./TitleMenu.module.css";
import Title from "./Title/Title";
import { diaryTemplate, setTitle } from "../../features/diarySlice";
import { noteId } from "../../features/readSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const TitleMenu = React.memo(() => {
  const postNote = useAppSelector((state) => state.read.postData.note);
  const postId = useAppSelector(noteId);
  const template = useAppSelector(diaryTemplate);
  const [active, setActive] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();

  const setTitleHandler = (
    event: { preventDefault: () => void },
    title: string
  ) => {
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
