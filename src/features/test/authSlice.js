import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: "/",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.token = null;
      state.userId = null;
    },
    setRedirectPath(state, action) {
      state.redirectPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload;
      });
  },
});

export const auth = createAsyncThunk(
  "auth/auth",
  async ({ email, password, isSignup }) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHwkentplNqp5vvQlz_uVpf4nVZxciYqk";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHwkentplNqp5vvQlz_uVpf4nVZxciYqk";
    }
    const response = await axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    // console.log('expirationDate auth', expirationDate)
    sessionStorage.setItem("token", response.data.idToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
    sessionStorage.setItem("userId", response.data.localId);
    return response.data;
  }
);

export const { logout, setRedirectPath } = authSlice.actions;

export default authSlice.reducer;
