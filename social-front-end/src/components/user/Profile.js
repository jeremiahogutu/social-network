import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";
import {read} from "./apiUser";
import {NavLink} from "react-router-dom";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "./profile.jpg";
import FollowButton from "./followButton";

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

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId)
    }

    render() {
        const {redirectToSignin, user} = this.state;
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        if (redirectToSignin) return <Redirect to='/signin'/>;
        return (
            <div className='mdl-grid' style={{justifyContent: 'center', maxWidth: '900px'}}>
                <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                    <div className="mdl-grid mdl-grid--no-spacing">
                        <div className='mdl-cell mdl-cell--8-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                            <h2>Profile</h2>
                        </div>
                    </div>
                </div>
                <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone'>
                    <div className="demo-card-square mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand" style={{justifyContent: 'center'}}>
                            <img
                                style={{width: '100%'}}
                                src={photoUrl}
                                onError={(e)=>{e.target.onerror = null; e.target.src=DefaultProfile}}
                                alt={user.name}/>
                        </div>
                    </div>
                </div>
                <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone'
                     style={{display: 'flex', alignItems: 'center'}}>
                    <div className="mdl-grid" style={{flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                        <div className='mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px'}}>
                                    <NavLink
                                        className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored'
                                        to={`/user/edit/${user._id}`}>Edit Profile</NavLink>
                                    <DeleteUser userId={user._id}/>
                                </div>
                            ) : (<FollowButton/>)}
                        </div>
                    </div>
                </div>
                <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                    {user.about}
                </div>
            </div>
        );
    }
}

export default Profile;