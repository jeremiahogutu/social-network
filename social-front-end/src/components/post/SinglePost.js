import React, {Component} from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
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
                <CardActionArea>
                    <CardMedia
                        style={{display: 'flex', justifyContent: 'center'}}
                        title="Contemplative Reptile"
                    >
                        <img
                            style={{ maxHeight: '450px', display: 'flex', paddingTop: '25px'}}
                            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            onError={i => {
                                i.target.src = `${DefaultPost}`
                            }}
                            alt={post.title}
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.body}
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
            <Grid container xs={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h3" style={{padding: "20px 0"}}>
                        {post.title}
                    </Typography>
                    <Typography variant="body2" component="p">

                        {this.renderPost(post)}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default SinglePost;