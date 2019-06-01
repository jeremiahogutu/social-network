import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";
import {read} from "./apiUser";
import {NavLink} from "react-router-dom";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "./profile.jpg";

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
        // const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : './profile.jpg';
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
                    <div className="demo-card-square mdl-card mdl-shadow--2dp" style={{width: "100%"}}>
                        <div className="mdl-card__title mdl-card--expand" style={{background: `no-repeat center/100% url(${process.env.REACT_APP_API_URL}/user/photo/${user._id}), #00aeaa no-repeat center/contain url(${DefaultProfile})`}}>
                            {/*<h2 className="mdl-card__title-text">{user.name}</h2>*/}
                        </div>
                        {/*<div className="mdl-card__supporting-text">*/}
                        {/*    {user.email}*/}
                        {/*</div>*/}
                        {/*<div className="mdl-card__actions mdl-card--border">*/}
                        {/*<NavLink to={`/user/${user._id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">*/}
                        {/*    View Profile*/}
                        {/*</NavLink>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--4-col-phone' style={{display: 'flex', alignItems: 'center'}}>
                    <div className="mdl-grid" style={{flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                        <div className='mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                            {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px'}}>
                                    <NavLink
                                        className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored'
                                        to={`/user/edit/${user._id}`}>Edit Profile</NavLink>
                                   <DeleteUser userId={user._id}/>
                                </div>
                            )}
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