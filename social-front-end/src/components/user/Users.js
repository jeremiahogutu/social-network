import React, {Component} from 'react';
import {list} from "./apiUser";
import {NavLink} from "react-router-dom";
import './user.css';
import DefaultProfile from "./profile.jpg";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data)
            } else {
                this.setState({
                    users: data
                })
            }
        })
    }

    renderUsers = (users) => (
    // const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;
        <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
            {users.map((user, i) => (
                <div className="demo-card-square mdl-card mdl-shadow--2dp" style={{marginTop: '2em'}} key={i}>
                    <div className="mdl-card__title mdl-card--expand" style={{background: `no-repeat center/100% url(${process.env.REACT_APP_API_URL}/user/photo/${user._id}), #00aeaa no-repeat center/contain url(${DefaultProfile})`}}>
                        <h2 className="mdl-card__title-text">{user.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {user.email}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <NavLink to={`/user/${user._id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            View Profile
                        </NavLink>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users} = this.state;
        return (
            <div className="mdl-grid" style={{justifyContent: 'center'}}>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <h2>Users</h2>
                </div>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;