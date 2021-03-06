import React, {Component} from 'react';
import {
    Avatar, Box, Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import {comment, uncomment} from "./apiPost";
import {isAuthenticated} from "../auth";
import {NavLink} from "react-router-dom";
import DefaultProfile from "../user/profile.jpg";


class Comment extends Component {
    state = {
        text: '',
        error: ''
    };

    handleChange = event => {
        this.setState({error: ""});
        this.setState({
            text: event.target.value
        })
    };

    isValid = () => {
        const {text} = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error: 'Comments should not be empty and less than 150 characters long'
            });
            return false
        }
        return true
    };

    addComment = e => {
        e.preventDefault();
        if (!isAuthenticated()) {
            this.setState({
                error: "Please signin to leave a comment"
            });
            return false
        }
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, {text: this.state.text}).then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({text: ''});
                    this.props.updateComments(data.comments)
                }
            })
        }
    };

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.props.updateComments(data.comments)
            }
        })
    };

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you sure you want to delete your comment?");
        if (answer) {
            this.deleteComment(comment)
        }
    };

    render() {
        const {comments, postId} = this.props;
        const {error} = this.state;
        return (
            <Grid container style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h4" color="textSecondary" style={{alignSelf: 'flex-start'}}>
                        Leave comment
                    </Typography>

                    <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}
                          onSubmit={this.addComment}>
                        <div style={{margin: '0 15px 0', width: '100%'}}>
                            <TextField
                                id="standard-body"
                                name="Comment"
                                value={this.state.text}
                                placeholder="Leave a comment..."
                                fullWidth
                                margin="normal"
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            {/*<input type="text" value={this.state.text} onChange={this.handleChange}/>*/}
                        </div>
                        <Button
                            variant="contained"
                            size="large"
                            style={{
                                backgroundColor: '#2196f3',
                                color: '#fff',
                                marginTop: '15px',
                                alignSelf: 'flex-start'
                            }}
                            type="submit"
                        >
                            Post
                        </Button>
                    </form>
                    <Typography component="div" variant="body1"
                                style={{display: error ? "block" : "none", textAlign: 'center'}}>
                        <Box color="error.main" style={{display: error ? "" : "none"}}>{error}</Box>
                    </Typography>
                    <h3>{comments.length} Comments</h3>
                    {comments.map((comment, i) => (
                        <List key={i} style={{width: '100%'}}>

                            <ListItem alignItems="flex-start">
                                <NavLink to={`/user/${comment.postedBy._id}`}
                                         style={{textDecoration: 'none', outline: 'none'}}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={comment.postedBy.name}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                            onError={i => {
                                                i.target.src = `${DefaultProfile}`
                                            }}
                                        />
                                    </ListItemAvatar>
                                </NavLink>
                                <ListItemText
                                    primary={comment.postedBy.name}
                                    secondary={
                                        <React.Fragment style={{display: 'flex'}}>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {comment.text}
                                            </Typography>

                                            <Typography variant="body2" color="textSecondary" component="p">
                                                posted by:
                                                <NavLink to={`${comment.postedBy._id}`}
                                                         style={{textDecoration: "none", outline: 'none'}}>
                                                    {' '}{comment.postedBy.name}{' '}
                                                </NavLink>
                                                on {new Date(comment.created).toDateString()}
                                            </Typography>

                                            {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                                <>
                                                    <Button size="small" color="secondary"
                                                            onClick={() => this.deleteConfirmed(comment)}>
                                                        Remove
                                                    </Button>
                                                </>
                                            )}
                                            <div>
                                                {isAuthenticated().user &&
                                                isAuthenticated().user.role === "admin" && (
                                                    <div className="card mt-5">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Admin</h5>
                                                            <p className="mb-2 text-danger">
                                                                Edit/Delete as an Admin
                                                            </p>
                                                            <NavLink
                                                                to={`/post/edit/${postId}`}
                                                                className="btn btn-raised btn-warning btn-sm mr-5"
                                                                style={{textDecoration: "none", outline: 'none'}}
                                                            >
                                                                <Button size="small" color="primary">
                                                                    Update Post
                                                                </Button>
                                                            </NavLink>
                                                            <Button size="small" color="secondary"
                                                                onClick={() => this.deleteConfirmed(comment)}
                                                            >
                                                                    Delete Post
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </List>
                    ))}
                </Grid>
            </Grid>

        );
    }
}

export default Comment;