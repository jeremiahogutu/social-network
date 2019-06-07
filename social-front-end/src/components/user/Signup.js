import React, {Component} from 'react';
import {signup} from "../auth";
import {NavLink} from "react-router-dom";
import {AppBar, Box, Button, Card, Grid, TextField, Toolbar, Typography} from "@material-ui/core";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            signUpSuccess: false
        }
    }

    // higher order function: A function that returns another function
    handleChange = userInput => event => {
        // clear old errors
        this.setState({error: ""});
        // we use array syntax to change values dynamically
        this.setState({[userInput]: event.target.value})
    };

    // handle submit
    onSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        };
        signup(user).then(data => {
            if (data.error) this.setState({error: data.error});
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    signUpSuccess: true
                })
        })
    };



    signUpForm = (name, email, password, error) => (
        <Grid container style={{justifyContent: 'center', width: '100%'}}>
            <Grid item xs style={{justifyContent: 'center'}}>
                <Card style={{margin: "30px auto", width: '330px', borderRadius: 0}}>
                    <div style={{flexGrow: 1}}>
                        <AppBar position="static" style={{boxShadow: 'none', backgroundColor: '#2196f3'}}>
                            <Toolbar>
                                <Typography variant="h6" color="inherit">
                                    Sign Up
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <Typography component="div" variant="body1">
                        <Box color="error.main" style={{display: error ? "" : "none"}}>{error}</Box>
                    </Typography>
                    <form style={{width: '100%'}}>
                        <div style={{margin: '0 15px 0'}}>
                            <TextField
                                id="standard-name"
                                label="Name"
                                type="name"
                                name="name"
                                value={name}
                                fullWidth
                                margin="normal"
                                onChange={this.handleChange("name")}
                            />
                        </div>
                        <div style={{margin: '0 15px 0'}}>
                            <TextField
                                id="standard-email-input"
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                fullWidth
                                margin="normal"
                                onChange={this.handleChange("email")}
                            />
                        </div>
                        <div style={{margin: '16px 15px'}}>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                fullWidth
                                onChange={this.handleChange("password")}
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0'}}>
                            <Button
                                onClick={this.onSubmit}
                                type="submit"
                                style={{backgroundColor: '#2196f3', color: '#fff'}}
                                variant="contained" size="large"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </Card>
            </Grid>
        </Grid>
    );

    render() {
        const {name, email, password, error, signUpSuccess} = this.state;
        return (
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
                <Typography component="div" variant="body1"  style={{display: signUpSuccess ? "flex" : "none", justifyContent: 'center', padding: '20px 0'}}>
                    <Box color="error.main" style={{display: error ? "" : "none"}}>New account is successfully created. Please{" "} <NavLink to='/signin'>{" "} Sign in</NavLink></Box>
                </Typography>
                {/*<div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone" style={{display: signUpSuccess ? "flex" : "none", justifyContent: 'center', padding: '20px 0'}}>New account is successfully created. Please{" "} <NavLink to='/signin'>{" "} Sign in</NavLink></div>*/}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {this.signUpForm(name, email, password, error)}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Signup;