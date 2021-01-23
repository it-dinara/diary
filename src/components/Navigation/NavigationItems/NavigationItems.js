import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>      
        {props.isAuthentication ? <NavigationItem link="/posts"  exact>Posts</NavigationItem>: null}
        {!props.isAuthentication ? 
        <NavigationItem link="/auth">Authenticate</NavigationItem>
        :
        <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;