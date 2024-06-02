import React from "react";
import Aux from "../_Aux/_Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authToken } from "../../features/authSlice";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const isAuthentication = useSelector(authToken) !== null;
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Aux>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuthentication={isAuthentication}
      />
      <SideDrawer
        isAuthentication={isAuthentication}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
}
