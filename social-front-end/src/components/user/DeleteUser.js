import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {remove} from "./apiUser";
import {signout} from "../auth";
import { Redirect} from "react-router-dom";
import {Button} from "@material-ui/core";

class DeleteUser extends Component {

    state = {
        redirect: false
    };

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    // signout user
                    signout(() => console.log('User is deleted'))
                    // redirect
                    this.setState({
                        redirect: true
                    })
                }
            })
    };

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?");
        if (answer) {
            this.deleteAccount()
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return (
            <Button variant="contained" size="medium" color="secondary" onClick={this.deleteConfirmed} style={{width: '150px', marginTop: '10px'}}>
                Delete Profile
            </Button>
        );
    }
}

export default DeleteUser;