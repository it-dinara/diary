import readReducer from "../features/readSlice";
import authReducer, {
  auth,
  logout,
  setRedirectPath,
  authCheckState,
  checkAuthTimeout,
  reAuth,
} from "../features/authSlice";
import diaryReducer, {
  saveDiary,
  fetchPosts,
  removePost,
} from "../features/diarySlice";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();
export default configureStore({
  reducer: {
    auth: authReducer,
    diary: diaryReducer,
    read: readReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

listenerMiddleware.startListening({
  actionCreator: fetchPosts.fulfilled,
  effect: (_, listenerApi) => {
    listenerApi.dispatch(setRedirectPath(null));
  },
});
listenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => sessionStorage.clear(),
});
listenerMiddleware.startListening({
  actionCreator: saveDiary.fulfilled,
  effect: (_, listenerApi) => {
    listenerApi.dispatch(setRedirectPath("/posts"));
  },
});
listenerMiddleware.startListening({
  actionCreator: removePost.fulfilled,
  effect: (_, listenerApi) => {
    listenerApi.dispatch(setRedirectPath("/posts"));
  },
});
listenerMiddleware.startListening({
  actionCreator: authCheckState,
  effect: (_, listenerApi) => {
    const idToken = sessionStorage.getItem("token");
    const expirationDate = new Date(sessionStorage.getItem("expirationDate"));
    if (!idToken) {
      console.log("!idToken----------------", idToken);
      listenerApi.dispatch(reAuth());
    } else {
      if (expirationDate > new Date()) {
        const localId = sessionStorage.getItem("userId");
        listenerApi.dispatch(auth.fulfilled({ idToken, localId }));
        listenerApi.dispatch(
          checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
        );
        console.log(
          "expirationMin",
          new Date(
            expirationDate.getTime() - new Date().getTime()
          ).getMinutes(),
          new Date(expirationDate.getTime() - new Date().getTime()).getSeconds()
        );
      } else {
        listenerApi.dispatch(reAuth());
      }
    }
  },
});
listenerMiddleware.startListening({
  actionCreator: checkAuthTimeout,
  effect: (_, listenerApi) => {
    return (expirationTime) => {
      return setTimeout(() => listenerApi.dispatch(reAuth()), expirationTime);
    };
  },
});
