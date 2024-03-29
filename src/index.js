import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import authReducer from "./store/reducers/auth";
import diaryReducer from "./store/reducers/diary";
import readReducer from "./features/test/readSlice";
import testReducer from "./features/test/testSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    diary: diaryReducer,
    read: readReducer,
    test: testReducer,
  },
});

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
