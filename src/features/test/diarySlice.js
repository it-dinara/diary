import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axios-diary.js";

const initialState = {
  loading: false,
  removing: false,
  fetchedPostsRes: [],
  diaryId: "",
  date: "",
  newDate: "",
  title: "",
  active: false,
  titleArray: [
    { id: 0, name: "context" },
    { id: 1, name: "feelings" },
    { id: 3, name: "thought" },
    { id: 2, name: "body" },
    { id: 4, name: "isItFamiliar" },
    { id: 5, name: "decision" },
    { id: 6, name: "conclusion" },
    { id: 7, name: "want" },
    { id: 8, name: "care" },
  ],
  template: [
    "context",
    "feelings",
    "body",
    "thought",
    "isItFamiliar",
    "decision",
    "conclusion",
    "want",
    "care",
  ],
  diaryObj: {},
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setActive(state, action) {
      state.active = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    clearDiaryObjToEdit(state, action) {
      state.diaryObj = {};
    },
    saveNoteInState(state, action) {
      const title = action.payload?.title;
      const value = action.payload?.value;
      state.diaryObj = { ...state.diaryObj, [title]: value };
    },
    noteInit(state, action) {
      state.title = action.payload;
      state.diaryObj = {};
      state.fullDate = null;
      state.millsec = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // saveDiary
      .addCase(saveDiary.pending, (state, action) => {})
      .addCase(saveDiary.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(saveDiary.fulfilled, (state, action) => {
        const { name, diaryData } = action.payload;
        state.diaryId = name;
        state.diary = diaryData;
      })
      // fetchPosts
      .addCase(fetchPosts.pending, (state, action) => {
        console.log("fetchPosts", action.meta);
        state.token = action.meta.arg.token;
        state.userId = action.meta.arg.userId;
        // очистить потом стейт, и в auth тоже? или так и так его видно было.
        // чтобы не хранить много данных
        // вообще надо брать этот стейт из auth напрямую,
        // а у меня ДАННЫЕ ДУБЛИРУЮТСЯ
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const fetchedPostsRes = [];
        for (let key in action.payload) {
          fetchedPostsRes.push({
            ...action.payload[key],
            id: key,
          });
        }
        state.fetchedPostsRes = fetchedPostsRes;
      })
      //removePost
      .addCase(removePost.pending, (state, action) => {})
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removePost.fulfilled, (state, { postId }) => {
        state.postId = postId;
      });
  },
});

export const saveDiary = createAsyncThunk(
  "saveDiary/auth",
  async ({ diaryData, token }) => {
    const response = await axiosInstance.post(
      "/journal.json?auth=" + token,
      diaryData
    );
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk(
  "diary/fetchPosts",
  async ({ token, userId }) => {
    console.log("fetchPosts userId", userId, "token", token);
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = await axiosInstance.get("/journal.json" + queryParams);
    return response.data;
  }
);

export const removePost = createAsyncThunk(
  "diary/removePost",
  async ({ token, postId }) => {
    if (!postId.length) {
      // console.log('Did not delete, removePost postId not correct', postId)
      return null;
    }
    const queryParams = "?auth=" + token;
    const response = await axios.delete(
      "https://diary-a95bf.firebaseio.com/journal/" +
        postId +
        ".json" +
        queryParams
    );
    return response.data;
  }
);

export const {
  setActive,
  setTitle,
  setValue,
  clearDiaryObjToEdit,
  saveNoteInState,
  noteInit,
} = diarySlice.actions;

export default diarySlice.reducer;
