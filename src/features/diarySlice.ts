import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axios-diary";
import { ReadStateType } from "./readSlice";
import { RootState } from "../app/store";

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

const initialState: DiaryStateType = {
  fetchedPostsRes: [],
  diaryId: "",
  title: "context",
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
  loading: false,
};

interface DiaryStateType {
  // to do try use zod on fetchedPostsRes, e.g. Array<typeof fetchedData>
  fetchedPostsRes: Array<any>;
  diaryId: string | null;
  title: string;
  template: typeof template;
  diaryObj: Record<string, string>;
  fullDate: string | null;
  millsec: number | null;
  error?: any;
  loading: boolean;
}

interface TState {
  auth: Record<string, string>;
  read: ReadStateType;
}

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setTitle(state, { payload }) {
      state.title = payload;
    },
    clearDiaryObjToEdit(state) {
      state.diaryObj = {};
    },
    saveNoteInState(state, { payload }) {
      const title = payload?.title;
      const value = payload?.value;
      state.diaryObj = { ...state.diaryObj, [title]: value };
    },
    noteInit(state, { payload = null }) {
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
      .addCase(fetchPosts.pending, (state) => {
        //to do remove dublicated loadings from slices
        state.loading = true;
      })
      .addCase(fetchPosts.rejected, (state, { error }) => {
        state.error = error.message;
        state.loading = false;
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
        state.loading = false;
      })
      //removePost
      .addCase(removePost.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const saveDiary = createAsyncThunk(
  "diary/saveDiary",
  async ({
    diaryData,
    token,
  }: {
    diaryData: unknown;
    token: string | null;
  }) => {
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
    const { token, userId } = (getState() as RootState).auth;
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = await axiosInstance.get("/journal.json" + queryParams);
    return response.data;
  }
);

export const removePost = createAsyncThunk(
  "diary/removePost",
  async (
    {
      token,
      postId,
    }: {
      token: string | null;
      postId: string | null;
    },
    { getState }
  ) => {
    // const token = (getState() as RootState).auth.token;
    // const postId = (getState() as RootState).read.postId;
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

export const diaryTemplate = (state: { diary: DiaryStateType }) =>
  state.diary.template;
export const diaryObj = (state: { diary: DiaryStateType }) =>
  state.diary.diaryObj;
export const diaryTitle = (state: { diary: DiaryStateType }) =>
  state.diary.title;

export default diarySlice.reducer;
