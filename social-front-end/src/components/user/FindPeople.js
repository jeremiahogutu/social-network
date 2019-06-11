import React, {Component} from 'react';
import {findPeople, follow} from "./apiUser";
import {NavLink} from "react-router-dom";
import './user.css';
import DefaultProfile from "./profile.jpg";
import {isAuthenticated} from "../auth";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

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
        <Grid id="followerGrid" item xl={10} md={10} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            {users.map((user, i) => (
                <Card key={i} className="userCard">
                    <CardActionArea>
                        <NavLink to={`/user/${user._id}`} style={{textDecoration: 'none', outline: 'none'}}>
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
                        <NavLink to={`/user/${user._id}`} style={{textDecoration: 'none', outline: 'none'}}>
                            <Button variant="contained" size="large"
                                    style={{backgroundColor: '#2196f3', color: '#fff'}}>
                                View Profile
                            </Button>
                        </NavLink>
                        <Button onClick={() => this.clickFollow(user, i)} variant="contained" size="large"
                                style={{backgroundColor: '#2196f3', color: '#fff'}}>
                            Follow
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Grid>
        // <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
        //     {users.map((user, i) => (
        //         <Card style={{width: 330, marginTop: '2em'}} key={i}>
        //             <CardActionArea>
        //                 <NavLink to={`/user/${user._id}`}>
        //                     <CardMedia
        //                         style={{height: 300}}
        //                         title={user.name}
        //                     >
        //                         <img
        //                             style={{width: "100%", maxHeight: "300px"}}
        //                             src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
        //                             onError={i => {
        //                                 i.target.src = `${DefaultProfile}`
        //                             }}
        //                             alt=""
        //                         />
        //                     </CardMedia>
        //                 </NavLink>
        //                 <CardContent>
        //                     <Typography gutterBottom variant="h5" component="h2">
        //                         {user.name}
        //                     </Typography>
        //                     <Typography variant="body2" color="textSecondary" component="p">
        //                         {`status: ${user.about === undefined ? 'no status' : user.about}`}
        //                     </Typography>
        //                 </CardContent>
        //             </CardActionArea>
        //             <CardActions>
        //                 <NavLink to={`/user/${user._id}`}>
        //                     <Button color="primary" size="large" style={{color: '#2196f3'}}>
        //                         View Profile
        //                     </Button>
        //                 </NavLink>
        //                 <Button onClick={() => this.clickFollow(user, i)} variant="contained" size="large"
        //                         style={{backgroundColor: '#2196f3', color: '#fff'}}>
        //                     Follow
        //                 </Button>
        //             </CardActions>
        //         </Card>
        //     ))}
        // </div>
    );

    render() {
        const {users, open, followMessage} = this.state;
        return (

            <Grid container xl={12} md={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xl={10} md={10} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h2" component="h2"
                                style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                        Find People
                    </Typography>
                </Grid>
                <div>
                    {open && (<p>{followMessage}</p>)}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    {this.renderUsers(users)}
                </div>
            </Grid>

            // <div className="mdl-grid" style={{justifyContent: 'center'}}>
            //     <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone"
            //          style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
            //         <Typography gutterBottom variant="h2" component="h2"
            //                     style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
            //             Find People
            //         </Typography>
            //         <div>
            //             {open && (<p>{followMessage}</p>)}
            //         </div>
            //         {this.renderUsers(users)}
            //     </div>
            // </div>
        );
    }
}

export default FindPeople;