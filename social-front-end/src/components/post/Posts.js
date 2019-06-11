import React, {Component} from 'react';
import {list} from "./apiPost";
import {NavLink} from "react-router-dom";
import '../user/user.css';
import {Card, CardActions, CardContent, Button, Typography, Grid} from "@material-ui/core";
import DefaultPost from "../assets/alpine-lake.jpg";

// import DefaultProfile from "./profile.jpg";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data)
            } else {
                this.setState({
                    posts: data
                })
            }
        })
    }


    renderPosts = (posts) => {

        return (
            <Grid id="postGrid" item xl={10} md={10} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                {posts.map((post, i) => {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
                    const posterName = post.postedBy ? post.postedBy.name : 'Unknown';
                    return (
                        <Card className="userCard" key={i}>
                            <CardContent style={{height: 300, display: 'flex', flexDirection: 'column'}}>
                                <img
                                    style={{maxWidth: '330px', width: "100%", minHeight: "250px", display: 'flex'}}
                                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                    onError={i => {
                                        i.target.src = `${DefaultPost}`
                                    }}
                                    alt={post.title}
                                />
                                <div style={{width: '100%'}}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop: '10px'}}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {post.body.substring(0, 40)}
                                    </Typography>
                                </div>
                            </CardContent>
                            <Typography variant="body2" color="textSecondary" component="p"
                                        style={{padding: "45px 16px 0"}}>
                                posted by:
                                <NavLink to={`${posterId}`} style={{textDecoration: "none", outline: 'none'}}>
                                    {' '}{posterName}{' '}
                                </NavLink>
                                on {new Date(post.created).toDateString()}
                            </Typography>
                            <CardActions>
                                <NavLink to={`/post/${post._id}`} style={{textDecoration: "none", outline: 'none'}}>
                                    <Button size="small" color="primary">
                                        Read More
                                    </Button>
                                </NavLink>
                            </CardActions>
                        </Card>
                    )
                })}
            </Grid>
        )
    }

    render() {
        const {posts} = this.state;
        return (
            <Grid container style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xl={10} md={10} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>


                    <Typography gutterBottom variant="h2" component="h2"
                                style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                        {!posts.length ? 'Loading...' : 'Recent Posts'}
                    </Typography>
                </Grid>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    {this.renderPosts(posts)}
                </div>
            </Grid>
        );
    }
}

export default Posts;