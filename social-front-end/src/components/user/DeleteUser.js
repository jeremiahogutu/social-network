import React, {Component} from 'react';

class DeleteUser extends Component {

    deleteAccount = () => {
        console.log('delete account')
    };

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?")
        if (answer) {
            this.deleteAccount()
        }
    };
    
    render() {
        return (
            <button
                onClick={this.deleteConfirmed}
                className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Delete Profile</button>
        );
    }
}

export default DeleteUser;