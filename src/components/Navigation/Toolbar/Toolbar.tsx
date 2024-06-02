import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { NavLink } from "react-router-dom";

type ToolbarProps = {
  drawerToggleClicked: () => void;
  isAuthentication: boolean;
};

const Toolbar = (props: ToolbarProps) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <NavLink
        to={props.isAuthentication ? "/posts" : "/auth"}
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
