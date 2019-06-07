import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {signin, authenticate} from "../auth";
import {AppBar, Typography, Toolbar, Button, Box, TextField, Card, Grid} from "@material-ui/core";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false
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
        this.setState({loading: true});
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        signin(user).then(data => {
            if (data.error) this.setState({error: data.error, loading: false});
            else {
                // authenticate
                authenticate(data, () => {
                    this.setState({redirectToReferer: true})
                })

            }
        })
    };


    signInForm = (email, password, error) => (
        <Grid container style={{justifyContent: 'center', width: '100%'}}>
            <Grid item xs style={{justifyContent: 'center'}}>
                <Card style={{margin: "30px auto", width: '330px', borderRadius: 0}}>
                    <div style={{flexGrow: 1}}>
                        <AppBar position="static" style={{boxShadow: 'none', backgroundColor: '#2196f3'}}>
                            <Toolbar>
                                <Typography variant="h6" color="inherit">
                                    Sign In
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                        <Typography component="div" variant="body1">
                            <Box color="error.main" style={{display: error ? "" : "none"}}>{error}</Box>
                        </Typography>
                        <form style={{width: '100%'}}>
                            <div style={{margin: '0 15px 30px'}}>
                                <TextField
                                    id="standard-name"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange("email")}
                                />
                            </div>
                            <div style={{margin: '30px 15px'}}>
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
                                    Sign In
                                </Button>
                            </div>
                        </form>
                </Card>
            </Grid>
        </Grid>
    );

    render() {
        const {email, password, error, redirectToReferer} = this.state;

        if (redirectToReferer) {
            return <Redirect to="/"/>
        }
        return (
            <div className='mdl-grid'>
                {this.signInForm(email, password, error)}
            </div>
        );
    }
}

export default Signin;