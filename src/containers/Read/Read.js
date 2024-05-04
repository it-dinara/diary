import { useSelector, useDispatch } from "react-redux";
import s from "./Read.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { diaryTemplate, saveNoteInState } from "../../features/diarySlice.js";

const Read = () => {
  const postData = useSelector((state) => state.read.postData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.read.loading);

  const editHandler = () => {
    //здесь из note пост переходит в объект при написании поста - diaryObj
    // dispatch(actions.setRedirectPath(null))
    for (let title in postNote) {
      let value = postNote[title];
      dispatch(saveNoteInState({ title, value }));
    }
    navigate("/");
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
  const template = useSelector(diaryTemplate);
  const notes = [];
  let postNote = null;
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
  let post = <Spinner />;
  if (postData && !loading) {
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
