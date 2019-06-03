import React, {Component} from 'react';
import {findPeople} from "./apiUser";
import {NavLink} from "react-router-dom";
import './user.css';
import DefaultProfile from "./profile.jpg";
import {isAuthenticated} from "../auth";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId, token).then(data => {
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
        <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
            {users.map((user, i) => (
                <div className="demo-card-square mdl-card mdl-shadow--2dp" style={{marginTop: '2em'}} key={i}>
                    <div className="mdl-card__title mdl-card--expand">
                        {/*<h2 className="mdl-card__title-text">{user.name}</h2>*/}
                        <img
                            style={{ width: "100%"}}
                            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                            onError={i => {i.target.src = `${DefaultProfile}`}}
                            alt=""
                        />
                    </div>
                    <div className="mdl-card__supporting-text">
                        {user.name}
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

export default FindPeople;