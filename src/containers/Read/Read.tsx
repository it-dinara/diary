import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { diaryTemplate, saveNoteInState } from "../../features/diarySlice";
import s from "./Read.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Read: FC = () => {
  const postData = useAppSelector((state) => state.read.postData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // todo
  const loading = useAppSelector((state) => state.read.loading);

  const editHandler = () => {
    if (postData) {
      for (let title in postData.note) {
        const value = postData.note[title];
        dispatch(saveNoteInState({ title, value }));
      }
      navigate("/");
    }
  };

  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const template = useAppSelector(diaryTemplate);
  const notes: { name: string; content: any }[] = [];
  let postNote: any = null;
  if (postData) {
    postNote = postData.note;
    for (let postName of template) {
      if (postNote[postName]) {
        notes.push({
          name: postName,
          content: postNote[postName],
        });
      }
    }
  }

  let post: JSX.Element = <Spinner />;
  if (postData && !loading) {
    const postItem = notes.map((item, i) => (
      <div className={s.container} key={i}>
        <p className={s.name}>{item.name}</p>
        <p className={s.content}>{item.content}</p>
      </div>
    ));
    post = (
      <div className={s.wrapper}>
        <div className={s.post}>
          <button className={s.editPost} onClick={() => editHandler()}>
            edit
          </button>
          <div className={s.read}>
            <div className={s.dateWrap}>
              <p className={[s.date, s.day].join(" ")}>
                {days[new Date(postData.millsec!).getDay()]}
              </p>
              <p className={s.date}>{postData.fullDate}</p>
            </div>
            {postItem}
          </div>
        </div>
      </div>
    );
  }

  return postData ? post : <Spinner />;
};

export default Read;
