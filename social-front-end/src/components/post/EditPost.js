import React, {Component} from 'react';
import {AppBar, Box, Card, Grid, TextField, Toolbar, Typography} from "@material-ui/core";
import {update, singlePost} from "./apiPost";
import Button from "@material-ui/core/Button";
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";

class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            error: '',
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        }
    }

    init = postId => {
        singlePost(postId)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToProfile: true
                    })
                } else {
                    this.setState({
                        id: data._id,
                        title: data.title,
                        body: data.body,
                        error: ''
                    })
                }
            })
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId)
    }

    isValid = () => {
        const {title, body, fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 1mb"
            });
            return false
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({
                error: "All fields are required",
                loading: false
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
        this.postData.set(userInput, value);
        this.setState({[userInput]: value, fileSize})
    };

    // handle submit
    onSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        if (this.isValid()) {
            const postId = this.state.id;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({error: data.error});
                else {
                    this.setState({
                        loading: false,
                        title: '',
                        body: '',
                        redirectToProfile: true
                    })
                }
            })
        }
    };

    editPostForm = (title, body, error) => (
        <Grid item xs style={{justifyContent: 'center', marginTop: '60px'}}>
            <Card id="createPostCard">
                <div style={{flexGrow: 1}}>
                    <AppBar position="static" style={{boxShadow: 'none', backgroundColor: '#2196f3'}}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Update Post
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <form style={{width: '100%'}}>
                    <Typography component="div" variant="body1"
                                style={{display: error ? "block" : "none", textAlign: 'center'}}>
                        <Box color="error.main" style={{display: error ? "" : "none"}}>{error}</Box>
                    </Typography>
                    <div style={{margin: '0 15px 0'}}>
                        <TextField
                            id="standard-title"
                            label="Title"
                            type="title"
                            name="title"
                            value={title}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange("title")}
                        />
                    </div>
                    <div style={{margin: '0 15px 0'}}>
                        <TextField
                            id="standard-body"
                            label="Body"
                            type="body"
                            name="body"
                            value={body}
                            multiline
                            rows="4"
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange("body")}
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
                        <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                variant="contained" size="large"
                                style={{backgroundColor: '#2196f3', color: '#fff'}}
                                onClick={this.onSubmit}
                                type="submit"
                                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored mdl-color--primary"
                            >
                                Update Post
                            </Button>
                        </Grid>
                    </div>
                </form>
            </Card>
        </Grid>
    );
    render() {
        const {title, body, error, redirectToProfile} = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`}/>
        }

        return (
            <Grid container style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h3" style={{padding: "20px 0"}}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{padding: "20px 0"}}>
                        {this.editPostForm(title, body, error)}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default EditPost;