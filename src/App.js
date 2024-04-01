// import { ThemeProvider } from 'emotion-theming'
// import theme from '@rebass/preset'
import "./App.css";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DiaryBuilder from "./containers/DiaryBuilder/DiaryBuilder";
import Start from "./containers/Start/Start";
import Read from "./containers/Read/Read";
import Posts from "./containers/PostsSecond/Posts";
import Auth from "./containers/Auth/AuthSecond";
import Logout from "./containers/Auth/Logout/LogoutSecond";
import * as actions from "./store/actions/index";
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
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );
  if (isAuthenticated) {
    router = (
      <Switch>
        <Route path="/start" component={Start} />
        <Route path="/logout" component={Logout} />
        <Route path="/posts" component={Posts} />
        <Route path="/" exact component={DiaryBuilder} />
        <Route path="/read" component={Read} />
        <Redirect to="/posts" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{router}</Layout>
    </div>
  );
};

export default withRouter(App);
