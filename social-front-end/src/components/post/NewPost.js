import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {create} from "./apiPost";
import {Redirect} from "react-router-dom";
import '../user/editProfile.css'
import {AppBar, Toolbar, Typography} from "@material-ui/core";

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        }
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({
            user: isAuthenticated().user
        })
    }

    isValid = () => {
        const {title, body, fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb"
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
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({error: data.error});
                else {
                    this.setState({
                        loading: false,
                        title: '',
                        body: '',
                        photo: '',
                        redirectToProfile: true
                    })
                }
            })
        }
    };

    newPostForm = (title, body, photo) => (
        <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
            <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px edit-card">
                <AppBar position="static" style={{boxShadow: 'none'}}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Create New Post
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="mdl-card__supporting-text mdl-grid" style={{display: 'flex', justifyContent: 'center'}}>
                    <form>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label
                                htmlFor="textfield_title">Name</label>
                            <input
                                onChange={this.handleChange("title")}
                                className="mdl-textfield__input"
                                type="text"
                                id="textfield_title"
                                name="name"
                                value={title}
                            />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label htmlFor="textfield_body">Body</label>
                            <textarea
                                onChange={this.handleChange("body")}
                                className="mdl-textfield__input"
                                rows="3"
                                id="textfield_body"
                                name="body"
                                value={body}
                            />
                        </div>
                        <div className='mdl-grid mdl-grid--no-spacing'>
                            <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                                <label htmlFor="avatar">Choose a profile picture:</label>
                            </div>
                            <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                                <input
                                    onChange={this.handleChange('photo')}
                                    type="file"
                                    id="avatar" name="avatar"
                                    accept="image/*"
                                    style={{margin: '10px 0'}}
                                />
                            </div>
                        </div>
                        <div
                            className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone send-button"
                            style={{display: 'flex', justifyContent: 'center', margin: 0, paddingBottom: '10px'}}>
                            <button
                                onClick={this.onSubmit}
                                type="submit"
                                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored mdl-color--primary"
                            >
                                Create Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

    render() {
        const {title, body, photo, user, error, loading, redirectToProfile} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`}/>
        }
        return (
            <div className='mdl-grid' style={{marginTop: '30px', flexDirection: 'column'}}>
                <p className="mdl-color-text--accent"
                   style={{display: error ? "block" : "none", textAlign: 'center'}}>{error}</p>
                <p className="mdl-color-text--accent"
                   style={{display: loading ? "block" : "none", textAlign: 'center'}}>Loading...</p>
                {this.newPostForm(title, body, photo)}
            </div>
        );
    }
}

export default NewPost;