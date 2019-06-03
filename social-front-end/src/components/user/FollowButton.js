import React, {Component} from 'react';
import {follow} from "./apiUser";

class FollowButton extends Component {
    followClick = () => {
        debugger;
        this.props.onButtonClick(follow)
    };
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                {
                    !this.props.following ? (
                        <button onClick={this.followClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                            Follow
                        </button>
                    ) : (
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                    UnFollow
                    </button>
                    )
                }
            </div>
        );
    }
}

export default FollowButton;