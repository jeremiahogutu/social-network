import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";
import {read} from "./apiUser";
import {NavLink} from "react-router-dom";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToSignin: true
                    })
                } else {
                    this.setState({
                        user: data
                    })
                }
            })
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    render() {
        const {redirectToSignin, user} = this.state;
        if (redirectToSignin) return <Redirect to='/signin'/>;
        return (
            <div className='mdl-grid' style={{justifyContent: 'center'}}>
                <div className='mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--4-col-phone'>
                    <h2>Profile</h2>
                    <p>Hello {isAuthenticated().user.name}</p>
                    <p>Email: {isAuthenticated().user.email}</p>
                    <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                </div>
                <div className='mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--4-col-phone'>
                    {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
                        <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '24px'}}>
                            <NavLink className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored' to={`/user/edit/${user._id}`}>Edit Profile</NavLink>
                            <NavLink className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' to={`/user/edit/${user._id}`}>Delete Profile</NavLink>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Profile;