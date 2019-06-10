import React, {Component} from 'react';
import {
    Avatar, Button,
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
        text: ''
    };

    handleChange = event => {
        this.setState({
            text: event.target.value
        })
    };

    addComment = e => {
        e.preventDefault();
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        comment(userId, token, postId, {text: this.state.text})
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    this.setState({
                        text: ''
                    });
                    this.props.updateComments(data.comments)
                }
            })
    };

    render() {
        const {comments} = this.props;
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
                        </div>
                        <Button
                            variant="contained"
                            size="large"
                            style={{backgroundColor: '#2196f3', color: '#fff', marginTop: '15px', alignSelf: 'flex-start'}}
                            type="submit"
                        >
                            Post
                        </Button>
                    </form>
                    {/*{JSON.stringify(comments)}*/}
                    <h3>{comments.length} Comments</h3>
                    {/*<hr/>*/}
                    {comments.map((comment, i) => (
                        <List key={i} style={{width: '100%'}}>
                            <NavLink to={`/user/${comment.postedBy._id}`}
                                     style={{textDecoration: 'none', outline: 'none'}}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={comment.postedBy.name}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                            onError={i => {
                                                i.target.src = `${DefaultProfile}`
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={comment.postedBy.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                </Typography>
                                                {comment.text}
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    posted by:
                                                    <NavLink to={`${comment.postedBy._id}`}
                                                             style={{textDecoration: "none"}}>
                                                        {' '}{comment.postedBy.name}{' '}
                                                    </NavLink>
                                                    on {new Date(comment.created).toDateString()}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </NavLink>
                        </List>
                    ))}
                </Grid>
            </Grid>

        );
    }
}

export default Comment;