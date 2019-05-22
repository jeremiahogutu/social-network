import React, {Component} from 'react';
import {isAuthenticated} from "../../App";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    componentDidMount() {
        console.log("user id from route params: ", this.props.match.params.userId)
    }

    render() {
        return (
            <div className='container'>
                <h2>Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email: {isAuthenticated().user.email}</p>
            </div>
        );
    }
}

export default Profile;