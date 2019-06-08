import React from 'react';
import PropTypes from 'prop-types';
import {SwipeableDrawer, makeStyles, Button, List, Divider, ListItem, ListItemIcon, ListItemText, CssBaseline, useScrollTrigger, AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Home, People, PeopleOutline, Forum, VpnKey, ExitToApp, PersonAdd, Menu} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import {isAuthenticated, signout} from "../auth";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

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
            {isAuthenticated() && (
                <NavLink style={{textDecoration: "none", color: "#757575", flexGrow: 1}}
                         to={`/user/${isAuthenticated().user._id}`}
                         activeStyle={{fontWeight: "bold", color: "#006494"}}>
                    <Typography variant="h5" style={{flexGrow: 1, margin: '20px 0 20px 20px'}}>
                        {isAuthenticated() ? `${isAuthenticated().user.name}'s profile` : "Social Network"}
                    </Typography>
                </NavLink>
            )}
            {!isAuthenticated() && (
                <>
                    <Typography variant="h5" style={{flexGrow: 1, margin: '20px 0 20px 20px'}}>
                        Social Network
                    </Typography>
                </>
            )}
            <Divider/>
            <List component="nav" aria-label="Main mailbox folders">
                {!isAuthenticated() && (
                    <>
                        <NavLink style={{color: '#212121', textDecoration: 'none'}}
                                 to="/"
                                 activeStyle={{fontWeight: "bold", color: "#006494"}}
                                 exact={true}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                        </NavLink>
                        <NavLink
                            style={{color: '#212121', textDecoration: 'none'}}
                            to="/signin"
                            activeStyle={{fontWeight: "bold", color: "#006494"}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <VpnKey/>
                                </ListItemIcon>
                                <ListItemText primary="Sign In"/>
                            </ListItem>
                        </NavLink>
                        <NavLink
                            style={{color: '#212121', textDecoration: 'none'}}
                            to="/signup"
                            activeStyle={{fontWeight: "bold", color: "#006494"}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonAdd/>
                                </ListItemIcon>
                                <ListItemText primary="Sign Up"/>
                            </ListItem>
                        </NavLink>
                    </>
                )}
                {isAuthenticated() && (
                    <div>
                        <NavLink
                            style={{color: '#212121', textDecoration: 'none'}}
                            to="/"
                            activeStyle={{fontWeight: "bold", color: "#006494"}}
                            exact={true}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Home/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                        </NavLink>
                        <NavLink
                            style={{color: '#212121', textDecoration: 'none'}}
                            to="/users"
                            activeStyle={{fontWeight: "bold", color: "#006494"}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <People/>
                                </ListItemIcon>
                                <ListItemText primary="Users"/>
                            </ListItem>
                        </NavLink>
                        <NavLink
                            style={{color: '#212121', textDecoration: 'none'}}
                            to="/findpeople"
                            activeStyle={{fontWeight: "bold", color: "#006494"}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleOutline/>
                                </ListItemIcon>
                                <ListItemText primary="Find People"/>
                            </ListItem>
                        </NavLink>
                        <NavLink
                            style={{color: '#212121', textDecoration: 'none'}}
                            to="/post/create"
                            activeStyle={{fontWeight: "bold", color: "#006494"}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Forum/>
                                </ListItemIcon>
                                <ListItemText primary="Create Post"/>
                            </ListItem>
                        </NavLink>
                        <ListItem button onClick={() => signout(() => window.location.href = "http://localhost:3000/")}>
                            <ListItemIcon>
                                <ExitToApp/>
                            </ListItemIcon>
                            <ListItemText primary="Sign Out"/>
                        </ListItem>
                    </div>
                )}
            </List>
        </div>
    );

    return (
        <div>
            <CssBaseline/>
            <ElevationScroll>
                <AppBar style={{backgroundColor: '#2196f3'}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={toggleDrawer('left', true)}>
                            <Menu/>
                        </IconButton>
                        {isAuthenticated() && (
                            <NavLink style={{textDecoration: "none", color: "#fff", flexGrow: 1}}
                                     to={`/user/${isAuthenticated().user._id}`}
                                     activeStyle={{fontWeight: "bold", color: "#006494"}}>
                                <Typography variant="h6" style={{flexGrow: 1}}>
                                    {isAuthenticated() ? `${isAuthenticated().user.name}'s profile` : "Social Network"}
                                </Typography>
                            </NavLink>
                        )}

                        {!isAuthenticated() && (
                            <>
                                <Typography variant="h6" style={{flexGrow: 1}}>
                                    Social Network
                                </Typography>
                                <NavLink style={{color: '#fff'}}
                                         to="/"
                                         activeStyle={{fontWeight: "bold", color: "#006494"}}
                                         exact={true}>
                                    <Button color="inherit">Home</Button>
                                </NavLink>
                                <NavLink
                                    style={{color: '#fff'}}
                                    to="/signin"
                                    activeStyle={{fontWeight: "bold", color: "#006494"}}>
                                    <Button color="inherit">Sign In</Button>
                                </NavLink>
                                <NavLink
                                    style={{color: '#fff'}}
                                    to="/signup"
                                    activeStyle={{fontWeight: "bold", color: "#006494"}}>
                                    <Button color="inherit">Sign Up</Button>
                                </NavLink>
                            </>
                        )}
                        {isAuthenticated() && (
                            <div>
                                <NavLink style={{color: '#fff'}}
                                         to="/"
                                         activeStyle={{fontWeight: "bold", color: "#006494"}}
                                         exact={true}>
                                    <Button color="inherit">Home</Button>
                                </NavLink>
                                <NavLink
                                    style={{color: '#fff'}}
                                    to="/users"
                                    activeStyle={{fontWeight: "bold", color: "#006494"}}>
                                    <Button color="inherit">Users</Button>
                                </NavLink>
                                <NavLink
                                    style={{color: '#fff'}}
                                    to="/findpeople"
                                    activeStyle={{fontWeight: "bold", color: "#006494"}}>
                                    <Button color="inherit">Find People</Button>
                                </NavLink>
                                <NavLink
                                    style={{color: '#fff'}}
                                    to="/post/create"
                                    activeStyle={{fontWeight: "bold", color: "#006494"}}>
                                    <Button color="inherit">Create Post</Button>
                                </NavLink>
                                <Button
                                    style={{
                                        cursor: "pointer",
                                        color: "#fff",
                                        background: "transparent",
                                        border: "none"
                                    }}
                                    onClick={() => signout(() => window.location.href = "http://localhost:3000/")}>Sign
                                    Out
                                </Button>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
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