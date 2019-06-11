import React, {Component} from "react";
import Posts from "../post/Posts";
import Users from "../user/Users";
import {Grid, Typography} from "@material-ui/core";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Admin extends Component {

    state = {
        redirectToHome: false
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                    <p className="lead">Welcome to React Frontend</p>
                </div>
                <Grid container style={{justifyContent: 'center', width: '100%'}}>
                    <Grid item xs={6} style={{justifyContent: 'center'}}>
                        <Typography gutterBottom variant="h2" component="h2"
                                    style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                            posts
                        </Typography>
                        <Posts/>
                        <hr/>
                    </Grid>
                    <Grid item xs={6} style={{justifyContent: 'center'}}>
                        <Typography gutterBottom variant="h2" component="h2"
                                    style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                            Users
                        </Typography>
                        <Users/>
                        <hr/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Admin