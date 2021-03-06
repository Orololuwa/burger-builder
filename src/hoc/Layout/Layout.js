import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from "../Auxs";
import classes from "./Layout.module.css";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    toggleSideDrawer = {this.toggleSideDrawerHandler}
                />
                <SideDrawer 
                    close = {this.closeSideDrawerHandler}
                    show = {this.state.showSideDrawer}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;