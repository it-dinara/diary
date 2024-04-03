import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  console.log("NavLink", NavLink);
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        end={props.exact}
        className={({ isActive }) => isActive && classes["active"]}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
