import React, {Component} from 'react';
import {list} from "./apiPost";
import {NavLink} from "react-router-dom";
import '../user/user.css';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid} from "@material-ui/core";
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
                            <CardActionArea>
                                <CardMedia
                                    style={{height: 300}}
                                    title="Contemplative Reptile"
                                >
                                    <img
                                        style={{ maxWidth: '330px', width: "100%", maxHeight: "250px", display: 'flex'}}
                                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                        onError={i => {
                                            i.target.src = `${DefaultPost}`
                                        }}
                                        alt={post.title}
                                    />
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {post.body.substring(0, 40)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Typography variant="body2" color="textSecondary" component="p" style={{padding: "0 16px"}}>
                                posted by:
                                <NavLink to={`${posterId}`} style={{textDecoration: "none"}}>
                                    {' '}{posterName}{' '}
                                </NavLink>
                                on {new Date(post.created).toDateString()}
                            </Typography>
                            <CardActions>
                                <NavLink to={`/posts/${post._id}`}>
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
            <Grid container xl={12} md={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xl={10} md={10} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h2" component="h2"
                                style={{alignSelf: 'flex-start', color: '#777', padding: 20}}>
                        Recent Posts
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