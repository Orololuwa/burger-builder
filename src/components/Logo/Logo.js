import React from 'react';
import logo from '../../Assets/burger-logo.png';
import classes from './Logo.module.scss';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={logo} alt="Logo" />
    </div>
);

export default Logo;