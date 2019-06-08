import React, {Component} from 'react';
import {list} from "./apiUser";
import {NavLink} from "react-router-dom";
import './user.css';
import DefaultProfile from "./profile.jpg";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

// breakpoint
// values: {
//     xs: 0,
//         sm: 450,
//         md: 600,
//         lg: 900,
//         xl: 1200
// }
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
        <Grid id="userGrid" item xl={10} md={10} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            {users.map((user, i) => (
                <Card key={i} className="userCard">
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
                            <Button variant="contained" size="large"
                                    style={{backgroundColor: '#2196f3', color: '#fff'}}>
                                View Profile
                            </Button>
                        </NavLink>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );

    // className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone
    render() {
        const {users} = this.state;
        return (
            <Grid container xl={12} md={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xl={10} md={10} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h2" component="h2"
                                style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                        Users
                    </Typography>
                </Grid>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    {this.renderUsers(users)}
                </div>
            </Grid>
        );
    }
}

export default Users;