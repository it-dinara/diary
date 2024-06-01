import classes from "./DrawerToggle.module.css";

const drawerToggle = (props: { clicked: () => void }) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
