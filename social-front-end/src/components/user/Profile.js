import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";
import {follow, unfollow, read} from "./apiUser";
import {NavLink} from "react-router-dom";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "./profile.jpg";
import ProfileTabs from "./ProfileTabs";
import {listByUser} from "../post/apiPost";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import "./user.css"

// import FollowButton from "./FollowButton";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {following: [], followers: []},
            redirectToSignin: false,
            following: false,
            error: '',
            posts: []
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
                    });
                    this.loadPosts(data._id)
                }
            })
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    posts: data
                })
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId)
    }

    render() {
        const {redirectToSignin, user, posts} = this.state;
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        if (redirectToSignin) return <Redirect to='/signin'/>;
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Grid container style={{justifyContent: 'center', marginTop: '60px', maxWidth: '900px'}}>
                    {/*<Grid item xs={12}>*/}
                    {/*    <Grid container xs={12}>*/}
                    {/*        <Grid item xs={12}>*/}
                    {/*            /!*<h2 style={{fontFamily: 'Lato'}}>Profile</h2>*!/*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    <Grid item xl={6} lg={6} md={6} sm={6} className="profileGrid">
                        <Card className="profileCard" style={{boxShadow: 'None'}}>
                            <img
                                style={{ height: '300px'}}
                                src={photoUrl}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DefaultProfile
                                }}
                                alt={user.name}/>
                        </Card>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        padding: '0 20px'
                    }}>
                        <p>Hello {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px', flexWrap: 'wrap'}}>
                                <NavLink
                                    to={`/user/edit/${user._id}`}>
                                    <Button variant="contained" size="medium"
                                            style={{backgroundColor: '#2196f3', color: '#fff', width: '150px', marginTop: '10px'}}>
                                        Edit Profile
                                    </Button>
                                </NavLink>
                                <NavLink
                                    to={`/post/create`}>
                                    <Button variant="contained" size="medium"
                                            style={{backgroundColor: '#2196f3', color: '#fff', width: '150px', marginTop: '10px'}}>
                                        Create Post
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
                        <div>
                            {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div className="card mt-5">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Admin
                                        </h5>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Edit/Delete as an Admin
                                        </Typography>
                                        <NavLink
                                            to={`/user/edit/${user._id}`}>
                                            <Button variant="contained" size="medium"
                                                    style={{backgroundColor: '#2196f3', color: '#fff', width: '150px', marginTop: '10px'}}>
                                                Edit Profile
                                            </Button>
                                        </NavLink>
                                        <DeleteUser userId={user._id}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} className='profileAboutTabs'>
                        <p>{user.about}</p>
                        <ProfileTabs
                            followers={user.followers}
                            following={user.following}
                            posts={posts}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Profile;