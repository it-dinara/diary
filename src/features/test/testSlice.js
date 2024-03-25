import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testState: [],
  second: 2,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    tested(state, action) {
      state.testState.push(action.payload);
    },
  },
});

export const { tested } = testSlice.actions;

export default testSlice.reducer;
