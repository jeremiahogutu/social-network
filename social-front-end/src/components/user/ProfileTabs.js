import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DefaultProfile from "./profile.jpg";

class ProfileTabs extends Component {
    render() {
        const {following, followers} = this.props;
        return (

            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                <div className="mdl-tabs__tab-bar" style={{justifyContent: 'space-around'}}>
                    <a href="#starks-panel" className="mdl-tabs__tab is-active">Followers</a>
                    <a href="#lannisters-panel" className="mdl-tabs__tab">Following</a>
                    <a href="#targaryens-panel" className="mdl-tabs__tab">Posts</a>
                </div>

                <div className="mdl-tabs__panel is-active" id="starks-panel">
                    {followers.map((person, i) => (
                            <div key={i} className="mdl-list__item" style={{padding: '10px 0'}}>
                                <span className="mdl-list__item-primary-content">
                                  {/*<i className="material-icons mdl-list__item-avatar">person</i>*/}
                                    <Link to={`/user/${person._id}`}
                                          style={{color: '#000', textDecoration: 'none'}}>
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                             height="30px" style={{ borderRadius: '50%' }} onError={i => {
                                            i.target.src = `${DefaultProfile}`
                                        }} alt={person.name}/>
                                        <span style={{paddingLeft: '10px'}}>{person.name}</span>
                                    </Link>
                                </span>
                            </div>
                        )
                    )}
                </div>
                <div className="mdl-tabs__panel" id="lannisters-panel">
                    {following.map((person, i) => (
                            <div key={i} className="mdl-list__item" style={{padding: '10px 0'}}>
                                <span className="mdl-list__item-primary-content">
                                    <Link to={`/user/${person._id}`}
                                          style={{color: '#000', textDecoration: 'none'}}>
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                             height="30px" style={{ borderRadius: '50%' }} onError={i => {
                                            i.target.src = `${DefaultProfile}`
                                        }} alt={person.name}/>
                                    <span style={{paddingLeft: '10px'}}>{person.name}</span></Link>
                                </span>
                            </div>
                        )
                    )}
                </div>
                <div className="mdl-tabs__panel" id="targaryens-panel">
                    {/*<ul>*/}
                    {/*    <li>Viserys</li>*/}
                    {/*    <li>Daenerys</li>*/}
                    {/*</ul>*/}
                </div>
            </div>

        );
    }
}

export default ProfileTabs;