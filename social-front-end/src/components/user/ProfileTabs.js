import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Divider, AppBar, List, ListItem, ListItemAvatar, Avatar, ListItemText} from "@material-ui/core";
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import {PeopleOutline, People, Forum} from "@material-ui/icons";
import DefaultProfile from "./profile.jpg";
import './profileTab.css'


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function ScrollableTabsButtonAuto(props) {
    const classes = useStyles();
    // const {followers, following} = this.props;
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (

        <div className={classes.root}>
            <AppBar position="static" color="#fff" style={{display: 'flex'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Followers" icon={<People/>}/>
                    <Tab label="Following" icon={<PeopleOutline/>}/>
                    <Tab label="Posts" icon={<Forum/>}/>
                </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>
                {props.followers.map((person, i) => (
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                    onError={i => { i.target.src = `${DefaultProfile}` }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={person.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                        </Typography>
                                        {"Chilling like a villan"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </List>
                ))}
            </TabContainer>}
            {value === 1 && <TabContainer>
                {props.following.map((person, i) => (
                    <List className={classes.root}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                    onError={i => { i.target.src = `${DefaultProfile}` }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={person.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                        </Typography>
                                        {"Happy to be here"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </List>
                ))}
            </TabContainer>}
            {value === 2 && <TabContainer>Posts</TabContainer>}
        </div>
    );
}

export default ScrollableTabsButtonAuto;