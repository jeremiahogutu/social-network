import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {singlePost} from "./apiPost";
import DefaultPost from "../assets/alpine-lake.jpg";
import {NavLink} from "react-router-dom";

class SinglePost extends Component {
    state = {
        post: ''
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    post: data
                })
            }
        })
    };

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : 'Unknown';
        return (
            <Card className="postCard">
                <CardContent style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{padding: '10px 0 26px', alignSelf: 'center'}}>
                        <img
                            style={{maxHeight: '450px', display: 'flex'}}
                            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            onError={i => {
                                i.target.src = `${DefaultPost}`
                            }}
                            alt={post.title}
                        />
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p" style={{maxWidth: '900px'}}>
                        {post.body}
                    </Typography>
                </CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{padding: "0 16px"}}>
                    posted by:
                    <NavLink to={`${posterId}`} style={{textDecoration: "none"}}>
                        {' '}{posterName}{' '}
                    </NavLink>
                    on {new Date(post.created).toDateString()}
                </Typography>
                <CardActions>
                    <NavLink to={`/`}>
                        <Button size="small" color="primary">
                            Back to posts
                        </Button>
                    </NavLink>
                </CardActions>
            </Card>
        )
    };

    render() {
        const {post} = this.state;
        return (
            <Grid container style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h3" style={{padding: "20px 0"}}>
                        {post.title}
                    </Typography>
                    {!post ? (
                        <Typography variant="h3">Loading...</Typography>
                    ) : (
                        <Typography variant="h3">
                            {this.renderPost(post)}
                        </Typography>
                    )}


                </Grid>
            </Grid>
        );
    }
}

export default SinglePost;