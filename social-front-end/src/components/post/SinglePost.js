import React, {Component} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {singlePost} from "./apiPost";

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
    }

    render() {
        return (
            <Grid container xs={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h3" style={{padding: "20px 0"}}>
                        single post
                    </Typography>
                    <Typography variant="body2" component="p">

                        {JSON.stringify(this.state.post)}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default SinglePost;