import readReducer from "../features/readSlice";
import authReducer, {
  auth,
  logout,
  setRedirectPath,
  authCheckState,
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
