import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TPostData {
  fullDate: string | null;
  millsec: number | null;
  note: Record<string, string>;
  userId: string | null;
}

export interface ReadStateType {
  postId: string | null;
  postData: TPostData;
  loading: boolean;
  error?: any;
}

const initialState: ReadStateType = {
  postId: null,
  postData: {
    fullDate: null,
    millsec: null,
    note: { asd: "zxc" },
    userId: null,
  },
  loading: false,
};

const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    setPostId(state, action: PayloadAction<string>) {
      state.postId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPostDataToRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPostDataToRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setPostDataToRead.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload;
      });
  },
});

export const setPostDataToRead = createAsyncThunk(
  "read/setPostDataToRead",
  async ({ token, postId }: { token: string; postId: string }) => {
    const queryParams = "?auth=" + token;
    const response = await axios.get(`
      https://diary-a95bf.firebaseio.com/journal/${postId}.json${queryParams}
    `);
    return response.data;
  }
);

export const { setPostId } = readSlice.actions;

export default readSlice.reducer;

export const noteId = (state: { read: ReadStateType }) => state.read.postId;
