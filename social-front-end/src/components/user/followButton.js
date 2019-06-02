import React from 'react';

const FollowButton = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Follow
            </button>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                UnFollow
            </button>
        </div>
    );
};

export default FollowButton;
