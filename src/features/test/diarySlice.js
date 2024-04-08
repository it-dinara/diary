import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axios-diary.js";

const initialState = {
  fetchedPostsRes: [],
  diaryId: "",
  // date: "",
  // newDate: "",
  title: "",
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
    setTitle(state, { payload }) {
      state.title = payload;
    },
    clearDiaryObjToEdit(state, action) {
      state.diaryObj = {};
    },
    saveNoteInState(state, { payload }) {
      const title = payload?.title;
      const value = payload?.value;
      state.diaryObj = { ...state.diaryObj, [title]: value };
    },
    noteInit(state, { payload }) {
      state.title = payload;
      state.diaryObj = {};
      state.fullDate = null;
      state.millsec = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // saveDiary
      .addCase(saveDiary.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(saveDiary.fulfilled, (state, { payload: { name } }) => {
        state.diaryId = name;
      })
      // fetchPosts
      .addCase(fetchPosts.rejected, (state, { error }) => {
        state.error = error.message;
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
      .addCase(removePost.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const saveDiary = createAsyncThunk(
  "diary/saveDiary",
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
  async (_, { getState }) => {
    const { token, userId } = getState().auth;
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = await axiosInstance.get("/journal.json" + queryParams);
    return response.data;
  }
);

export const removePost = createAsyncThunk(
  "diary/removePost",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const postId = getState().read.postId;
    console.log("removePost", token, postId, getState());
    if (postId?.length === 0) {
      return null;
    }
    const queryParams = "?auth=" + token;
    const response = await axios.delete(
      "https://diary-a95bf.firebaseio.com/journal/" +
        postId +
        ".json" +
        queryParams
    );
    console.log("deleting", response);
    return response.data;
  }
);

export const { setTitle, clearDiaryObjToEdit, saveNoteInState, noteInit } =
  diarySlice.actions;

export default diarySlice.reducer;
