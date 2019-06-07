import React, {Component} from 'react';
import {list} from "./apiPost";
import {NavLink} from "react-router-dom";
import '../user/user.css';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from "@material-ui/core";
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
        <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
        {posts.map((post, i) => (
        <Card style={{width: 330, marginTop: '2em'}} key={i}>
            <CardActionArea>
                <CardMedia
                    style={{height: 140}}
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
                <NavLink to={`/posts/${post._id}`} >
                <Button size="small" color="primary">
                    Learn More
                </Button>
                </NavLink>
            </CardActions>
        </Card>
            ))}
        </div>
        // <div className="mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-cell--4-col-phone user-container">
        //     {posts.map((post, i) => (
        //         <div className="demo-card-square mdl-card mdl-shadow--2dp" style={{marginTop: '2em'}} key={i}>
        //             <div className="mdl-card__title mdl-card--expand">
        //                 {/*<h2 className="mdl-card__title-text">{user.name}</h2>*/}
        //                 {/*<img*/}
        //                 {/*    style={{ width: "100%", maxHeight: "300px"}}*/}
        //                 {/*    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}*/}
        //                 {/*    onError={i => {i.target.src = `${DefaultProfile}`}}*/}
        //                 {/*    alt=""*/}
        //                 {/*/>*/}
        //             </div>
        //             <div className="mdl-card__supporting-text">
        //                 {post.title}
        //                 {/*<p>{post.body}</p>*/}
        //             </div>
        //             <div className="mdl-card__actions mdl-card--border">
        //                 <NavLink to={`/posts/${post._id}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        //                     Read More
        //                 </NavLink>
        //             </div>
        //         </div>
        //     ))}
        // </div>
    );

    render() {
        const {posts} = this.state;
        return (
            <div className="mdl-grid" style={{justifyContent: 'center'}}>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone"
                     style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography gutterBottom variant="h2" component="h2" style={{alignSelf: 'flex-start', color: '#777'}}>
                        Recent Posts
                    </Typography>
                    {this.renderPosts(posts)}
                </div>

            </div>
        );
    }
}

export default Posts;