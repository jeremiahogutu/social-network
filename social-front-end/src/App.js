import React, {Component} from 'react';
// import {NavLink} from "react-router-dom";
import MainRouter from "./MainRouter";
// import {close, isAuthenticated, signout} from "./components/auth";
import {AppBar, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableTemporaryDrawer from "./components/ui-helpers/SwipeableTemporaryDrawer";


class App extends Component {
    render() {
        return (
            <div style={{flexGrow: 1}}>
                <SwipeableTemporaryDrawer/>
                <main className="mdl-layout__content">
                    <div className="page-content"><MainRouter/></div>
                </main>
            </div>
            )
    }
}


export default App;
