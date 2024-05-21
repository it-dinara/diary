import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axios-diary.js";
import { TReadState } from "./readSlice";

const template = [
  "context",
  "feelings",
  "body",
  "thought",
  "isItFamiliar",
  "decision",
  "conclusion",
  "want",
  "care",
] as const;

const initialState: TDiaryState = {
  fetchedPostsRes: [],
  diaryId: "",
  title: "",
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
  fullDate: null,
  millsec: null,
  error: false,
};

interface TDiaryState {
  fetchedPostsRes: Record<string, string>[];
  diaryId: string | null;
  title: string | null;
  template: typeof template;
  diaryObj: Record<string, string>;
  fullDate: string | null;
  millsec: number | null;
  error?: any;
}

interface TState {
  auth: Record<string, string>;
  read: TReadState;
}

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
  async ({ diaryData, token }: { diaryData: any; token: string }) => {
    const response = await axiosInstance.post(
      "/journal.json?auth=" + token,
      diaryData
    );
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk<any, any, { state: TState }>(
  "diary/fetchPosts",
  async (_, { getState }) => {
    const { token, userId } = getState().auth;
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = await axiosInstance.get("/journal.json" + queryParams);
    return response.data;
  }
);

export const removePost = createAsyncThunk<any, any, { state: TState }>(
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

export const diaryTemplate = (state: { diary: TDiaryState }) =>
  state.diary.template;
export const diaryObj = (state: { diary: TDiaryState }) => state.diary.diaryObj;
export const diaryTitle = (state: { diary: TDiaryState }) => state.diary.title;

export default diarySlice.reducer;
