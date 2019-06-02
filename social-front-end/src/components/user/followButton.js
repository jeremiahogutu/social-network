import React from 'react';

const FollowButton = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {
                props.following ? (
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                        UnFollow
                    </button>
                ) : (
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                        Follow
                    </button>
                )
            }
        </div>
    );
};

export default FollowButton;
