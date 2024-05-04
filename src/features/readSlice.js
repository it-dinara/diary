import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postId: null,
  postData: {
    fullDate: null,
    millsec: null,
    note: {},
    userId: null,
  },
  loading: false,
};

const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    setPostId(state, action) {
      state.postId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPostDataToRead.pending, (state, action) => {
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
  async ({ token, postId }) => {
    const queryParams = "?auth=" + token;
    const response = await axios.get(`
      https://diary-a95bf.firebaseio.com/journal/${postId}.json${queryParams}
    `);
    return response.data;
  }
);

export const { setPostId } = readSlice.actions;

export default readSlice.reducer;

export const noteId = (state) => state.read.postId;
