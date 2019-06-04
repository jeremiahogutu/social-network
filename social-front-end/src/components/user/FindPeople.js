import React, {Component} from 'react';
import {findPeople, follow} from "./apiUser";
import {NavLink} from "react-router-dom";
import './user.css';
import DefaultProfile from "./profile.jpg";
import {isAuthenticated} from "../auth";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: '',
            open: false
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

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id)
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    })
                } else {
                    let tofollow = this.state.users;
                    tofollow.splice(i, 1);
                    this.setState({
                        users: tofollow,
                        open: true,
                        followMessage: `Following ${user.name}`
                    })
                }
            })
    };

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
                        <button onClick={() => this.clickFollow(user, i)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users, open, followMessage} = this.state;
        return (
            <div className="mdl-grid" style={{justifyContent: 'center'}}>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <h2>Find People</h2>
                    <div>
                        {open && (<p>{followMessage}</p>)}
                    </div>
                </div>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;