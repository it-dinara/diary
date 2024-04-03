import { useSelector, useDispatch } from "react-redux";
import s from "./Read.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useEffect } from "react";
import { saveNoteInState } from "../../features/test/diarySlice.js";

const Read = () => {
  const postData = useSelector((state) => state.read.postData);
  // console.log('postData', postData)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editHandler = () => {
    //здесь из note пост переходит в объект при написании поста - diaryObj
    // dispatch(actions.setRedirectPath(null))
    for (let title in postNote) {
      let value = postNote[title];
      dispatch(saveNoteInState({ title, value }));
    }
    navigate("/");
  };

  //   const postIdSelector = useSelector((state) => state.read.postId);
  //   useEffect(() => console.log("page read postId", postIdSelector), []);

  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const template = useSelector((state) => state.diary.template);
  const notes = [];
  let postNote = null;
  if (postData) {
    postNote = postData.note;
    // console.log('postNote', postNote)
    for (let postName of template) {
      if (postNote[postName]) {
        notes.push({
          name: postName,
          content: postNote[postName],
        });
      }
    }
  }

  let post = Spinner;
  if (postData) {
    // console.log('notes', notes)
    const postItem = notes.map((item, i) => (
      <div className={s.container} key={i}>
        <p className={s.name}>{item.name}</p>
        <p className={s.content}>{item.content}</p>
      </div>
    ));
    post = (
      <>
        <div className={s.wrapper}>
          <div className={s.post}>
            <button className={s.editPost} onClick={() => editHandler()}>
              edit
            </button>
            <div className={s.read}>
              <div className={s.dateWrap}>
                <p className={[s.date, s.day].join(" ")}>
                  {days[new Date(postData.millsec).getDay()]}
                </p>
                <p className={s.date}>{postData.fullDate}</p>
              </div>
              {postItem}
            </div>
          </div>
        </div>
      </>
    );
  }

  return postData ? post : <Spinner />;
};

export default Read;
