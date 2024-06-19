import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Posts.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-diary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { setPostId } from "../../features/readSlice";
import {
  saveNoteInState,
  noteInit,
  fetchPosts,
} from "../../features/diarySlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
const Post = React.lazy(() => import("./Post/Post"));

const Posts = () => {
  const fetchedPostsRes = useAppSelector(
    (state) => state.diary.fetchedPostsRes
  );
  const loading = useAppSelector((state) => state.diary.loading);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(saveNoteInState(null));
    dispatch(setPostId(null));
    dispatch(fetchPosts());
    // to do fetchPosts recieve data twice(as other data receiving actions too), apparently case of
    // file structure(useSelector of parent component, may be need to cach data)
  }, [dispatch]);

  let res = [];
  type KeyofFetchedPostsRes = keyof typeof fetchedPostsRes;

  for (let key in fetchedPostsRes) {
    if (fetchedPostsRes[key as KeyofFetchedPostsRes].millsec) {
      res.push(fetchedPostsRes[key as KeyofFetchedPostsRes]);
    }
  }
  const [flag, setFlag] = useState(false);
  if (!flag) {
    res.sort((a, b) => b.millsec - a.millsec);
  } else {
    res.sort((a, b) => a.millsec - b.millsec);
  }

  const sortHandler = () => {
    setFlag(!flag);
  };

  let posts: React.ReactNode = <Spinner />;
  if (!loading) {
    posts = res.map((post) => {
      if (
        value === "" ||
        Object.keys(post.note)
          .concat(Object.values(post.note))
          .join(" ")
          .indexOf(value) >= 0
      ) {
        return (
          <Suspense fallback={<div>Loading...</div>} key={post.id}>
            <Post
              note={post.note}
              fullDate={post.fullDate}
              postId={post.id}
              millsec={post.millsec}
            />
          </Suspense>
        );
      }
      return null;
    });
  }

  const history = useNavigate();
  const makeNewNoteHandler = () => {
    //очистка стейта от удалёного поста
    dispatch(noteInit(null));
    history("/");
  };

  const start = (
    <button className={s.newNote} onClick={() => makeNewNoteHandler()}>
      New note
    </button>
  );

  return (
    <div className={s.container}>
      <div className={s.panel}>
        {start}
        <div className={s.search}>
          <button onClick={sortHandler}>{flag ? "↓↑" : "↑↓"}</button>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              console.log("val", event.target.value);
              setValue(event.target.value);
            }}
          />
        </div>
      </div>

      <div className={s.list}>{posts}</div>
    </div>
  );
};

export default withErrorHandler(Posts, axios);
