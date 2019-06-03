import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DefaultProfile from "./profile.jpg";

class ProfileTabs extends Component {
    render() {
        const {following, followers} = this.props;
        return (
            <div className="mdl-grid mdl-grid--no-spacing">
                <div
                    className='mdl-cell mdl-cell--1-offset mdl-cell--3-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                    <h3 style={{padding: 0, margin: 0}}>Followers</h3>

                    <div className="demo-list-action mdl-list" style={{padding: 0}}>
                        {followers.map((person, i) => (
                                <div key={i} className="mdl-list__item" style={{padding: '10px 0'}}>
                                    <span className="mdl-list__item-primary-content">
                                      {/*<i className="material-icons mdl-list__item-avatar">person</i>*/}
                                        <Link to={`/user/${person._id}`} style={{color: '#000', textDecoration: 'none'}}><img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} height="30px" style={{paddingRight: '10px'}} onError={i => {i.target.src = `${DefaultProfile}`}} alt={person.name}/><span>{person.name}</span></Link>
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div
                    className='mdl-cell mdl-cell--1-offset mdl-cell--3-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                    <h3 style={{padding: 0, margin: 0}}>Following</h3>
                    <div className="demo-list-action mdl-list" style={{padding: 0}}>
                        {following.map((person, i) => (
                                <div className="mdl-list__item" style={{padding: '10px 0'}}>
                                    <span className="mdl-list__item-primary-content">
                                        <Link to={`/user/${person._id}`} style={{color: '#000', textDecoration: 'none'}}><img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} height="30px" style={{paddingRight: '10px'}} onError={i => {i.target.src = `${DefaultProfile}`}} alt={person.name}/><span>{person.name}</span></Link>
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div
                    className='mdl-cell mdl-cell--1-offset mdl-cell--3-col mdl-cell--8-col-tablet mdl-cell--4-col-phone'>
                    <h3 style={{padding: 0, margin: 0}}>Posts</h3>
                    <div className="demo-list-action mdl-list">
                        <div className="mdl-list__item" style={{padding: '10px 0'}}>
                            <span className="mdl-list__item-primary-content">
                              <i className="material-icons mdl-list__item-avatar">person</i>
                              <span>Bryan Cranston</span>
                            </span>
                        </div>
                        <div className="mdl-list__item" style={{padding: '10px 0'}}>
                            <span className="mdl-list__item-primary-content">
                              <i className="material-icons mdl-list__item-avatar">person</i>
                              <span>Aaron Paul</span>
                            </span>
                        </div>
                        <div className="mdl-list__item" style={{padding: '10px 0'}}>
                            <span className="mdl-list__item-primary-content">
                              <i className="material-icons mdl-list__item-avatar">person</i>
                              <span>Bob Odenkirk</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTabs;