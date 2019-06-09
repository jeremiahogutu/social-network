import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update, updateUser} from "./apiUser";
import {AppBar, Box, Card, Grid, TextField, Toolbar, Typography} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import './editProfile.css'
import DefaultProfile from './profile.jpg';
import Button from "@material-ui/core/Button";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: '',
            fileSize: 0,
            loading: false,
            about: ""
        }
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToProfile: true
                    })
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        error: ''
                    })
                }
            })
    };

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    isValid = () => {
        const {name, email, password, fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 1mb"
            });
            return false
        }
        if (name.length === 0) {
            this.setState({
                error: "Name is required"
            });
            return false
        }

        //email@domain.com
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "A valid email is required"
            });
            return false
        }

        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long"
            });
            return false
        }
        return true
    };

    // higher order function: A function that returns another function
    handleChange = userInput => event => {
        this.setState({
            error: ''
        });
        // we use array syntax to change values dynamically
        const value = userInput === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = userInput === 'photo' ? event.target.files[0].size : 0;
        this.userData.set(userInput, value);
        this.setState({[userInput]: value, fileSize})
    };

    // handle submit
    onSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(data => {
                if (data.error) this.setState({error: data.error});
                else
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        })
                    })
            })
        }
    };

    signUpForm = (name, email, about, password, photoUrl, error) => (
        <Grid item xs style={{justifyContent: 'center', marginTop: '60px'}}>
            <Card id="editProfileCard">
                <div style={{flexGrow: 1}}>
                    <AppBar position="static" style={{boxShadow: 'none', backgroundColor: '#2196f3'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Edit Profile
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <form style={{width: '100%'}}>
                    <img
                        style={{height: '200px', width: 'auto'}}
                        className='edit-image'
                        src={photoUrl}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={name}/>
                    <Typography component="div" variant="body1"
                                style={{display: error ? "block" : "none", textAlign: 'center'}}>
                        <Box color="error.main" style={{display: error ? "" : "none"}}>{error}</Box>
                    </Typography>
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
                            id="standard-multiline-static"
                            label="About"
                            name="about"
                            value={about}
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange("about")}
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
                    <div style={{margin: '16px 15px'}}>
                        <Grid container xs={12}>
                            <Grid item xs={12}>
                                <label htmlFor="avatar">Choose a profile picture:</label>
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    onChange={this.handleChange('photo')}
                                    type="file"
                                    id="avatar" name="avatar"
                                    accept="image/*"
                                    style={{margin: '10px 0'}}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{margin: '16px 15px'}}>
                        <Grid container xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                variant="contained" size="large"
                                style={{backgroundColor: '#2196f3', color: '#fff'}}
                                onClick={this.onSubmit}
                                type="submit"
                                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored mdl-color--primary"
                            >
                                Update
                            </Button>
                        </Grid>
                    </div>
                </form>
            </Card>
        </Grid>

    );

    render() {
        const {id, name, email, about, password, redirectToProfile, error} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;
        return (
            <Grid container xl={12} md={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                {/*<p className="mdl-color-text--accent"*/}
                {/*   style={{display: loading ? "block" : "none", textAlign: 'center'}}>Loading...</p>*/}

                {this.signUpForm(name, email, about, password, photoUrl, error)}

            </Grid>
        );
    }
}

export default EditProfile;