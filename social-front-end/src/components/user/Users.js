import React, {Component} from 'react';
import {list} from "./apiUser";
import {NavLink} from "react-router-dom";
import './user.css';
import DefaultProfile from "./profile.jpg";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";

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
        <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
            {users.map((user, i) => (
                <Card style={{width: 330, marginTop: '2em'}} key={i}>
                    <CardActionArea>
                        <NavLink to={`/user/${user._id}`}>
                            <CardMedia
                                style={{height: 300}}
                                title={user.name}
                            >
                                <img
                                    style={{width: "100%", maxHeight: "300px"}}
                                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                                    onError={i => {
                                        i.target.src = `${DefaultProfile}`
                                    }}
                                    alt=""
                                />
                            </CardMedia>
                        </NavLink>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`status: ${user.about === undefined ? 'no status' : user.about}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <NavLink to={`/user/${user._id}`}>
                            <Button variant="contained" size="large" style={{backgroundColor: '#2196f3', color: '#fff'}}>
                                View Profile
                            </Button>
                        </NavLink>
                    </CardActions>
                </Card>
            ))}
        </div>
        // <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
        //     {users.map((user, i) => (
        //         <div className="demo-card-square mdl-card mdl-shadow--2dp" style={{marginTop: '2em'}} key={i}>
        //             <div className="mdl-card__title mdl-card--expand">
        //                 {/*<h2 className="mdl-card__title-text">{user.name}</h2>*/}
        //                 <img
        //                     style={{ width: "100%", maxHeight: "300px"}}
        //                     src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
        //                     onError={i => {i.target.src = `${DefaultProfile}`}}
        //                     alt=""
        //                 />
        //             </div>
        //             <div className="mdl-card__supporting-text">
        //                 {user.name}
        //             </div>
        //             <div className="mdl-card__actions mdl-card--border">
        //                 <NavLink to={`/user/${user._id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        //                     View Profile
        //                 </NavLink>
        //             </div>
        //         </div>
        //     ))}
        // </div>
    );

    render() {
        const {users} = this.state;
        // const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        return (
            <div className="mdl-grid" style={{justifyContent: 'center'}}>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone"
                     style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h2" component="h2" style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                        Users
                    </Typography>
                    {this.renderUsers(users)}
                </div>
            </div>
        );
    }
}

export default Users;