import React, { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import s from "./Diary.module.css";
import { useDispatch, useSelector } from "react-redux";
import { saveNoteInState, diaryObj, diaryTitle } from "../../features/diarySlice";

const Diary = React.forwardRef((props, ref) => {
  const title = useSelector(diaryTitle);
  const stateFeelings = useSelector(diaryObj);
  //отрисовка текста в Textarea
  //Например: context: 'Привет'
  let textareaVal = stateFeelings[title] ? stateFeelings[title] : "";
  const [value, setValue] = useState(textareaVal);

  const dispatch = useDispatch();
  const txt = useRef(null);
  useEffect(() => {
    //создание поста
    dispatch(saveNoteInState({ title, value }));
    txt.current.focus();
  }, [title, value, dispatch]);

  return (
    <div className={s.wrap}>
      <TextareaAutosize
        name="textValue"
        minRows={15}
        onHeightChange={() => {}}
        className={s.textarea}
        value={value}
        onChange={(event) => {
          console.log("Diary", event.target.value);
          setValue(event.target.value);
        }}
        ref={txt}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
      />
    </div>
  );
});

export default Diary;
