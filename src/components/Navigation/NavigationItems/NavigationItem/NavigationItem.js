import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        end={props.end}
        className={({ isActive }) => (isActive ? classes["active"] : "")}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
