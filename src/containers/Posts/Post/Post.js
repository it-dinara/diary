import { useDispatch, useSelector } from "react-redux";
import s from "./Post.module.css";
import { useNavigate } from "react-router-dom";
import { tested } from "../../../features/testSlice";
import { setPostId, setPostDataToRead } from "../../../features/readSlice";
import { clearDiaryObjToEdit } from "../../../features/diarySlice.js";

const Post = (props) => {
  const template = useSelector((state) => state.diary.template);
  const second = useSelector((state) => state.test.second);
  const notes = [];
  for (let postName of template) {
    if (props.note[postName]) {
      notes.push({
        name: postName,
        content: props.note[postName],
      });
    }
  }

  const postIdSelector = useSelector((state) => state.read.postId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const toReadHandler = (postId) => {
    dispatch(clearDiaryObjToEdit());
    console.log("postIdSelector", postIdSelector, "postId", postId);
    dispatch(setPostId(postId));
    dispatch(setPostDataToRead({ token, postId }));
    navigate("/read");
  };
  const second2 = useSelector((state) => state.test.second);
  const testFn = (postId) => {
    dispatch(tested(postId));
    console.log("second", second, second2);
  };

  const postItem = notes.map((item, i) => (
    <div className={s.container} key={i}>
      <p className={s.name}>{item.name}</p>
      <p className={s.content}>{item.content}</p>
    </div>
  ));

  return (
    <>
      <div
        className={s.wrapper}
        // onClick={() => toReadHandler(props.note, props.fullDate, props.millsec, props.postId)}
        onClick={() => toReadHandler(props.postId)}
        // onClick={() => testFn(props.postId)}
      >
        <div className={s.post}>
          <p className={s.date}>{props.fullDate}</p>
          {postItem}
        </div>
      </div>
    </>
  );
};

export default Post;
