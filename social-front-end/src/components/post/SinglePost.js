import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {singlePost, remove, like, unlike} from "./apiPost";
import DefaultPost from "../assets/alpine-lake.jpg";
import {NavLink, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {ThumbUp, ThumbUpAltOutlined} from '@material-ui/icons';
import Comment from "./Comment";

class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
        redirectToSignIn: false,
        like: false,
        likes: 0,
        comments: []
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                })
            }
        })
    };

    updateComments = comments => {
        this.setState({
            comments
        })
    };

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({
                redirectToSignIn: true
            });
            return false
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;
        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                })
            }
        })
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    redirectToHome: true
                })
            }
        })
    };

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?");
        if (answer) {
            this.deletePost()
        }
    };


    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : 'Unknown';
        const {like, likes} = this.state;
        return (
            <Card className="postCard">
                <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{padding: '10px 0 26px', alignSelf: 'center'}}>
                        <img
                            style={{maxHeight: '450px', display: 'flex', width: '100%'}}
                            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            onError={i => {
                                i.target.src = `${DefaultPost}`
                            }}
                            alt={post.title}
                        />
                    </div>
                    {like ? (
                        <Typography variant="body1" color="textSecondary" onClick={this.likeToggle} style={{display: 'flex', alignSelf: 'flex-start', paddingBottom: '15px'}}>
                            <ThumbUp color="primary" style={{marginRight: '10px'}}/> {likes} Like
                        </Typography>
                    ) : (
                        <Typography variant="body1" color="textSecondary" onClick={this.likeToggle} style={{display: 'flex', alignSelf: 'flex-start', paddingBottom: '15px'}}>
                            <ThumbUpAltOutlined style={{marginRight: '10px'}}/>{' '}{likes} Like
                        </Typography>
                    )}

                    <Typography variant="body2" color="textSecondary" component="p" >
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
                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id &&
                    <React.Fragment>
                        <NavLink to={`/post/edit/${post._id}`}>
                            <Button size="small" color="primary">
                                Update post
                            </Button>
                        </NavLink>
                        <Button size="small" color="secondary" onClick={this.deleteConfirmed}>
                            Delete post
                        </Button>
                    </React.Fragment>
                    }

                </CardActions>
            </Card>
        )
    };

    render() {
        const {post, redirectToHome, redirectToSignIn, comments} = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`}/>
        } else if (redirectToSignIn) {
            return <Redirect to={`/signin`}/>
        }
        return (
            <Grid container  style={{justifyContent: 'center', marginTop: '60px', padding: '10px'}}>
                <Grid id="singlePostGridItem" item xs={12}  style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
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
                    <Comment postId={post._id} comments={comments} updateComments={this.updateComments}/>
                </Grid>
            </Grid>
        );
    }
}

export default SinglePost;