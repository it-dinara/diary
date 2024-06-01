import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/_Aux/_Aux";

type tsideDrawer = {
  open: boolean;
  closed: () => void;
  isAuthentication: boolean;
};

const sideDrawer = (props: tsideDrawer) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthentication={props.isAuthentication} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
