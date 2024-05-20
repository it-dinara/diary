import readReducer from "../features/readSlice";
import authReducer, {
  auth,
  logout,
  setRedirectPath,
  authCheckState,
  checkAuthTimeout,
  reAuth,
} from "../features/authSlice.js";
import diaryReducer, {
  saveDiary,
  fetchPosts,
  removePost,
} from "../features/diarySlice.js";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

const listenerMiddleware = createListenerMiddleware();
const store = configureStore({
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
    const expirationDate = new Date(
      sessionStorage.getItem("expirationDate") as string
    );
    if (!idToken) {
      console.log("!idToken----------------", idToken);
      listenerApi.dispatch(reAuth());
    } else {
      if (expirationDate > new Date()) {
        const localId = sessionStorage.getItem("userId");
        listenerApi.dispatch(
          // TODO strange id parameter, added cause ts error
          auth.fulfilled({ idToken, localId }, "id: authCheckState")
        );
        const calc = expirationDate.getTime() - new Date().getTime();
        listenerApi.dispatch(checkAuthTimeout(calc as any as void));
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
  effect: async (_, listenerApi) => {
    const timer = () => (expirationTime: number) => {
      return setTimeout(() => listenerApi.dispatch(reAuth()), expirationTime);
    };
    timer();
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
