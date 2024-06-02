import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AuthStateType = {
  userId: null,
  token: null,
  error: null,
  loading: false,
  redirectPath: "/",
  email: "",
  password: "",
};

interface AuthStateType {
  userId: string | null;
  token: string | null;
  error?: any;
  loading: boolean;
  redirectPath: string | null;
  email: string;
  password: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userId = null;
    },
    setRedirectPath(state, action: PayloadAction<string | null>) {
      state.redirectPath = action.payload;
    },
    authCheckState() {},
    checkAuthTimeout() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state, action) => {
        state.loading = true;
        state.email = action.meta.arg.email;
        state.password = action.meta.arg.password;
      })
      //error state dublicates across the slices
      //to do some utile fn
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(auth.fulfilled, (state, action) => {
        console.log("auth.fulfilled", action);
        // remove from state?
        state.token = action.payload.idToken;
        state.userId = action.payload.localId;
        //
        state.loading = false;
        state.error = null;
      })
      .addCase(reAuth.rejected, (state, action) => {
        console.log("reAuth Rejected", action);
        state.error = action.error.message;
      })
      .addCase(reAuth.pending, (_, action) => {
        console.log("reAuth Pending", action);
      })
      .addCase(reAuth.fulfilled, (state, action) => {
        console.log("reAuth Fulfilled", action);
        state.token = action.payload.id_token;
        state.userId = action.payload.user_id;
      });
  },
});

export const auth = createAsyncThunk(
  "auth/auth",
  async ({
    email,
    password,
    isSignup,
  }: {
    email: string;
    password: string;
    isSignup: boolean;
  }) => {
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
    sessionStorage.setItem("expirationDate", expirationDate as any as string);
    sessionStorage.setItem("userId", response.data.localId);

    return response.data;
  }
);

export const reAuth = createAsyncThunk("auth/reAuth", async (_, thunkIPA) => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const body = "grant_type=refresh_token&refresh_token=" + refreshToken;
  let url =
    "https://securetoken.googleapis.com/v1/token?key=AIzaSyCHwkentplNqp5vvQlz_uVpf4nVZxciYqk";
  sessionStorage.clear();
  const response = await axios.post(url, body);
  // const idToken = response.data.id_token;
  // const localId = response.data.user_id;
  // thunkIPA.dispatch(auth.fulfilled({ idToken, localId }));
  const expirationDate = new Date(
    new Date().getTime() + response.data.expires_in * 1000
  );
  sessionStorage.setItem("token", response.data.id_token);
  sessionStorage.setItem("refreshToken", response.data.refresh_token);
  sessionStorage.setItem("expirationDate", expirationDate as any as string);
  sessionStorage.setItem("userId", response.data.user_id);

  console.log("reAuth ---", response.data);

  return response.data;
});

export const { logout, setRedirectPath, authCheckState, checkAuthTimeout } =
  authSlice.actions;

export default authSlice.reducer;

export const authToken = (state: { auth: AuthStateType }) => state.auth.token;
