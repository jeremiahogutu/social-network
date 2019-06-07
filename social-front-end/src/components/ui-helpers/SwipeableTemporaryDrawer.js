import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import Power from '@material-ui/icons/Power'
import Forum from '@material-ui/icons/Forum'
import PowerOff from '@material-ui/icons/PowerOff'
import VpnKey from '@material-ui/icons/VpnKey'
import ExitToApp from '@material-ui/icons/ExitToApp'
import PersonAdd from '@material-ui/icons/PersonAdd'
import MailIcon from '@material-ui/icons/Mail';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from "react-router-dom";
import {close, isAuthenticated, signout} from "../auth";
// import {close, isAuthenticated, signout} from "./components/auth";
import DraftsIcon from '@material-ui/icons/Drafts';
import Signup from "../user/Signup";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    window: PropTypes.func,
};

function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [side]: open});
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <Divider/>
            <Typography variant="h5" style={{flexGrow: 1, margin: '20px 0 20px 20px'}}>
                Social Network
            </Typography>
            <Divider/>
            <List component="nav" aria-label="Main mailbox folders">
                <ListItem button>
                    <ListItemIcon>
                        <Home/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <People/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleOutline/>
                    </ListItemIcon>
                    <ListItemText primary="Find People"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Forum/>
                    </ListItemIcon>
                    <ListItemText primary="Create Post"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <VpnKey/>
                    </ListItemIcon>
                    <ListItemText primary="Sign In"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PersonAdd/>
                    </ListItemIcon>
                    <ListItemText primary="Sign Up"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <CssBaseline/>
            <ElevationScroll>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
                            <MenuIcon/>
                        </IconButton>
                        {/*     {isAuthenticated() && (*/}
                        {/*         <NavLink style={{textDecoration: "none", color: "#fff"}} to={`/user/${isAuthenticated().user._id}`} activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>*/}
                        {/*<span*/}
                        {/*    className="mdl-layout-title">{isAuthenticated() ? `${isAuthenticated().user.name}'s profile` : "Social Network"}</span>*/}
                        {/*         </NavLink>*/}
                        {/*     )}*/}
                        {isAuthenticated() && (
                        <NavLink style={{textDecoration: "none", color: "#fff", flexGrow: 1}}
                                 to={`/user/${isAuthenticated().user._id}`}
                                 activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                            <Typography variant="h6" style={{flexGrow: 1}}>
                                {isAuthenticated() ? `${isAuthenticated().user.name}'s profile` : "Social Network"}
                            </Typography>
                        </NavLink>
                        )}
                        <NavLink style={{color: '#fff'}}
                                 to="/"
                                 activeStyle={{fontWeight: "bold", color: "#f3ca86"}}
                                 exact={true}>
                            <Button color="inherit">Home</Button>
                        </NavLink>
                        {!isAuthenticated() && (
                            <>
                                <NavLink to="/signin"
                                         activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                                    <Button color="inherit">Sign In</Button>
                                </NavLink>
                                <NavLink to="/signup"
                                         activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                                    <Button color="inherit">Sign Up</Button>
                                </NavLink>
                            </>
                        )}
                        {isAuthenticated() && (
                            <div>
                                <NavLink to="/users"
                                         activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                                    <Button color="inherit">Users</Button>
                                </NavLink>
                                <NavLink to="/findpeople"
                                         activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                                    <Button color="inherit">Find People</Button>
                                </NavLink>
                                <NavLink to="/post/create"
                                         activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                                    <Button color="inherit">Create Post</Button>
                                </NavLink>
                                <Button
                                    style={{cursor: "pointer", color: "#fff", background: "transparent", border: "none"}}
                                    onClick={() => signout(() => window.location.href = "http://localhost:3000/")}>Sign Out
                                </Button>
                            </div>
                        )}


                        {/*<Button color="inherit">Create Post</Button>*/}
                        {/*<Button color="inherit">Sign In</Button>*/}
                        {/*<Button color="inherit">Sign Up</Button>*/}
                        {/*<Button color="inherit">Sign Out</Button>*/}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>*/}
            {/*            <MenuIcon />*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6" style={{flexGrow: 1}}>*/}
            {/*            Social Network*/}
            {/*        </Typography>*/}
            {/*        <Button color="inherit">Home</Button>*/}
            {/*        <Button color="inherit">Users</Button>*/}
            {/*        <Button color="inherit">Find People</Button>*/}
            {/*        <Button color="inherit">Create Post</Button>*/}
            {/*        <Button color="inherit">Sign In</Button>*/}
            {/*        <Button color="inherit">Sign Out</Button>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
}

export default SwipeableTemporaryDrawer;