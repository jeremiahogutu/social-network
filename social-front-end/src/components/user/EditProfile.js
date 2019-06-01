import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update} from "./apiUser";
import {Redirect} from "react-router-dom";
import './editProfile.css'
import DefaultProfile from './profile.jpg';

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
            loading: false
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
                error: "File size should be less than 100kb"
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
        const value = userInput === 'photo' ? event.target.files[0] :event.target.value;
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
                    this.setState({
                        redirectToProfile: true
                    })
            })
        }
    };

    signUpForm = (name, email, password, photoUrl) => (
        <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
            <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px edit-card">
                <div className="mdl-card__title mdl-color--indigo">
                    <h2 className="mdl-card__title-text mdl-color-text--white">Edit Profile</h2>
                </div>
                <div className="mdl-card__supporting-text mdl-grid">
                    <form>
                        <img
                            style={{ height: '200px', width: 'auto'}}
                            className='edit-image'
                            src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={name}/>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label
                                htmlFor="textfield_username">Name</label>
                            <input
                                onChange={this.handleChange("name")}
                                className="mdl-textfield__input"
                                type="text"
                                id="textfield_name"
                                name="name"
                                value={name}
                            />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label htmlFor="textfield_username">Email</label>
                            <input
                                onChange={this.handleChange("email")}
                                className="mdl-textfield__input"
                                type="email"
                                id="textfield_email"
                                name="email"
                                value={email}
                            />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label htmlFor="textfield_password">Password</label>
                            <input
                                className="mdl-textfield__input"
                                onChange={this.handleChange("password")}
                                type="password"
                                id="textfield_password"
                                name="password"
                                value={password}
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
                        <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone send-button" style={{display: 'flex', justifyContent: 'center', margin: 0, paddingBottom: '10px'}}>
                            <button
                                onClick={this.onSubmit}
                                type="submit"
                                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored mdl-color--primary"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

    render() {
        const {id, name, email, password, redirectToProfile, error} = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>
        }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;
        return (
            <div className='mdl-grid' style={{marginTop: '30px', flexDirection: 'column'}}>
                <p className="mdl-color-text--accent"
                   style={{display: error ? "block" : "none", textAlign: 'center'}}>{error}</p>
                {/*<p className="mdl-color-text--accent"*/}
                {/*   style={{display: loading ? "block" : "none", textAlign: 'center'}}>Loading...</p>*/}
                {this.signUpForm(name, email, password, photoUrl)}
            </div>
        );
    }
}

export default EditProfile;