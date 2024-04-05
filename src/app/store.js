import authReducer, { auth } from "../features/test/authSlice";
import readReducer from "../features/test/readSlice";
import testReducer from "../features/test/testSlice";
import {
  logout,
  setRedirectPath,
  authCheckState,
} from "../features/test/authSlice";
import diaryReducer, {
  saveDiary,
  fetchPosts,
  removePost,
} from "../features/test/diarySlice";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();
export default configureStore({
  reducer: {
    auth: authReducer,
    diary: diaryReducer,
    read: readReducer,
    test: testReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

listenerMiddleware.startListening({
  actionCreator: auth.fulfilled,
  effect: (_, listenerApi, meta) => {
    console.log("listenerApi auth", listenerApi);
    // const data = listenerApi.getState().auth;
    // const expirationDate = new Date(
    //   new Date().getTime() + data.expiresIn * 1000
    // );
    // // console.log('expirationDate auth', expirationDate)
    // sessionStorage.setItem("token", data.idToken);
    // sessionStorage.setItem("refreshToken", data.refreshToken);
    // sessionStorage.setItem("expirationDate", expirationDate);
    // sessionStorage.setItem("userId", data.localId);
  },
});
listenerMiddleware.startListening({
  actionCreator: fetchPosts.fulfilled,
  effect: (_, listenerApi) => {
    console.log("listenerApi fetchPosts", listenerApi);
    listenerApi.dispatch(setRedirectPath(null));
  },
});
listenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => sessionStorage.clear(),
});
listenerMiddleware.startListening({
  actionCreator: saveDiary.fulfilled,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(setRedirectPath("/posts"));
  },
});
listenerMiddleware.startListening({
  actionCreator: removePost.fulfilled,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(setRedirectPath("/posts"));
  },
});
listenerMiddleware.startListening({
  actionCreator: authCheckState,
  effect: (action, listenerApi) => {
    const idToken = sessionStorage.getItem("token");
    const localId = sessionStorage.getItem("userId");
    const expirationDate = new Date(sessionStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      listenerApi.dispatch(auth.fulfilled({ idToken, localId }));
    }
  },
});
