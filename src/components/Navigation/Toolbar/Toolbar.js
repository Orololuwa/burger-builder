import  React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrwaerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.scss';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <DrwaerToggle clicked={props.toggleSideDrawer}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly} >
            <NavItems />
        </nav>
    </header>
);

export default toolBar;