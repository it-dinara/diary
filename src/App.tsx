// import { ThemeProvider } from 'emotion-theming'
// import theme from '@rebass/preset'
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DiaryBuilder from "./containers/DiaryBuilder/DiaryBuilder";
import Read from "./containers/Read/Read";
import Posts from "./containers/Posts/Posts";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import { authCheckState, authToken } from "./features/authSlice";

const App = () => {
  const isAuthenticated = useSelector(authToken) !== null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
    const expirationDate = sessionStorage.getItem("expirationDate");
    console.log("expirationDate App", expirationDate);
  }, [dispatch]);

  let router = (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );

  if (isAuthenticated) {
    router = (
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/" element={<DiaryBuilder />} />
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
