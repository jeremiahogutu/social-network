import React, {Component} from 'react';
import {list} from "./apiPost";
import {NavLink} from "react-router-dom";
import '../user/user.css';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid} from "@material-ui/core";

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


    renderPosts = (posts) => (
        <Grid id="postGrid" item xl={10} md={10} style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            {posts.map((post, i) => (
                <Card className="userCard" key={i}>
                    <CardActionArea>
                        <CardMedia
                            style={{height: 300}}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.body}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <NavLink to={`/posts/${post._id}`}>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </NavLink>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );

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