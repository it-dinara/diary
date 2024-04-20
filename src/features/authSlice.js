import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userId: null,
  token: null,
  error: null,
  loading: false,
  redirectPath: "/",
  authData: null,
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
    authCheckState() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state, action) => {
        state.loading = true;
        state.email = action.meta.arg.email;
        state.password = action.meta.arg.password;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(auth.fulfilled, (state, action) => {
        const { idToken, localId, expiresIn } = action.payload;
        console.log("auth action.payload", action.payload);
        state.token = idToken;
        state.userId = localId;
        state.loading = false;
        state.error = null;
        state.expiresIn = expiresIn;
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
    sessionStorage.setItem("token", response.data.idToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
    sessionStorage.setItem("userId", response.data.localId);

    return response.data;
  }
);

// написать reAuth

export const { logout, setRedirectPath, authCheckState } = authSlice.actions;

export default authSlice.reducer;

export const authToken = (state) => state.auth.token;
