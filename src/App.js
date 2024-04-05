// import { ThemeProvider } from 'emotion-theming'
// import theme from '@rebass/preset'
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DiaryBuilder from "./containers/DiaryBuilder/DiaryBuilder";
import Start from "./containers/Start/Start";
import Read from "./containers/Read/Read";
import Posts from "./containers/PostsSecond/Posts";
import Auth from "./containers/Auth/AuthSecond";
import Logout from "./containers/Auth/Logout/LogoutSecond";
import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";

const App = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(actions.authCheckState())
    // const expirationDate = localStorage.getItem('expirationDate');
    // console.log('expirationDate App', expirationDate)
  }, [dispatch]);

  let router = (
    <Routes>
      <Route path="/auth" end element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );

  if (isAuthenticated) {
    router = (
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/" end element={<DiaryBuilder />} />
        <Route path="/read" element={<Read />} />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    );
  }

  return (
    <div>
      <Layout>{router}</Layout>
    </div>
  );
};

export default App;
