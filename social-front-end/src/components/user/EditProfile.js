import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read} from "./apiUser";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            email: '',
            password: ''
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
                        id: data._id,
                        name: data.name,
                        email: data.email
                    })
                }
            })
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    render() {
        return (
            <div>
                <h2>Edit Profile</h2>
            </div>
        );
    }
}

export default EditProfile;