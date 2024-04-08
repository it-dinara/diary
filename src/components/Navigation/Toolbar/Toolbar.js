import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Toolbar = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <NavLink
        to={isAuthenticated ? "/posts" : "/auth"}
        className={classes.Logo}
      >
        <Logo />
      </NavLink>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthentication={props.isAuthentication} />
      </nav>
    </header>
  );
};

export default Toolbar;
