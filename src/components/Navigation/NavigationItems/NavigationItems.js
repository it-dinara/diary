import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Дневник</NavigationItem>
        {props.isAuthentication ? <NavigationItem link="/orders">Записи</NavigationItem>: null}
		{!props.isAuthentication ? 
        <NavigationItem link="/auth">Войти</NavigationItem>
		:
        <NavigationItem link="/logout">Выйти</NavigationItem>}
    </ul>
);

export default navigationItems;