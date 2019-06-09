import React, {Component} from 'react';
import {Grid, Typography} from "@material-ui/core";

class SinglePost extends Component {
    render() {
        return (
            <Grid container xs={12} style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h3" style={{padding: "20px 0"}}>
                        single post
                    </Typography>
                    <Typography variant="body2" component="p">

                        {this.props.match.params.postId}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default SinglePost;