import s from "./Post.module.css";
import { useNavigate } from "react-router-dom";
import { setPostId, setPostDataToRead } from "../../../features/readSlice";
import {
  clearDiaryObjToEdit,
  diaryTemplate,
} from "../../../features/diarySlice";
import { authToken } from "../../../features/authSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

type PostProps = {
  note: Record<string, string>;
  postId: string;
  fullDate: string;
  millsec: number;
};

const Post = (props: PostProps) => {
  const template = useAppSelector(diaryTemplate);
  const notes = [];
  for (let postName of template) {
    if (props.note[postName]) {
      notes.push({
        name: postName,
        content: props.note[postName],
      });
    }
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(authToken);
  const toReadHandler = (postId: string) => {
    dispatch(clearDiaryObjToEdit());
    dispatch(setPostId(postId));
    if (token !== null) {
      dispatch(setPostDataToRead({ token, postId }));
    }
    navigate("/read");
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
