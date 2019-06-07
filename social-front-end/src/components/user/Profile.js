import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";
import {follow, unfollow, read} from "./apiUser";
import {NavLink} from "react-router-dom";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "./profile.jpg";
import ProfileTabs from "./ProfileTabs";
import {Button} from "@material-ui/core";

// import FollowButton from "./FollowButton";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {following: [], followers: []},
            redirectToSignin: false,
            following: false,
            error: ''
        }
    }

    // follower check
    checkFollow = user => {
        // debugger;
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        });
        return match
    };

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const followId = this.state.user._id;
        // debugger
        callApi(userId, token, followId).then(data => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({user: data, following: !this.state.following})
            }
        })
    };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToSignin: true
                    })
                } else {
                    let following = this.checkFollow(data);
                    this.setState({
                        user: data,
                        following
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
                            {/*<h2 style={{fontFamily: 'Lato'}}>Profile</h2>*/}
                        </div>
                    </div>
                </div>
                <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone'>
                    <div className="demo-card-square mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand" style={{justifyContent: 'center'}}>
                            <img
                                style={{width: '100%', maxHeight: '300px'}}
                                src={photoUrl}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DefaultProfile
                                }}
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
                                        to={`/user/edit/${user._id}`}>
                                        <Button variant="contained" size="large"
                                                style={{backgroundColor: '#2196f3', color: '#fff'}}>
                                            Edit Profile
                                        </Button>
                                    </NavLink>
                                    <DeleteUser userId={user._id}/>
                                </div>
                            ) : (
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>

                                    {
                                        !this.state.following ? (
                                            <Button onClick={() => this.clickFollowButton(follow)} variant="contained"
                                                    size="large"
                                                    style={{backgroundColor: '#2196f3', color: '#fff'}}>
                                                Follow
                                            </Button>
                                        ) : (
                                            <Button onClick={() => this.clickFollowButton(unfollow)} variant="contained"
                                                    size="large" color="secondary">
                                                UnFollow
                                            </Button>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                    <p>{user.about}</p>
                    <ProfileTabs followers={user.followers} following={user.following}/>
                </div>
            </div>
        );
    }
}

export default Profile;