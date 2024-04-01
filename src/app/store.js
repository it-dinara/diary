import authReducer from "../features/test/authSlice";
import readReducer from "../features/test/readSlice";
import testReducer from "../features/test/testSlice";
import { logout } from "../features/test/authSlice";
import diaryReducer from "../store/reducers/diary";
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
  actionCreator: logout,
  effect: () => sessionStorage.clear(),
});
