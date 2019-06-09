import React, {Component} from 'react';
import {Grid, Typography} from "@material-ui/core";

class EditPost extends Component {
    render() {
        return (
            <Grid container style={{justifyContent: 'center', marginTop: '60px'}}>
                <Grid item xs={12} style={{display: 'flex', flexDirection: 'Column', alignItems: 'center'}}>
                    <Typography variant="h3" style={{padding: "20px 0"}}>
                        Edit Post
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{padding: "20px 0"}}>
                        {this.props.match.params.postId}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default EditPost;