import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props: { isAuthentication: boolean }) => {
  console.log("navigationItems props", props);
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthentication ? (
        <>
          <NavigationItem link="/posts">Posts</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
