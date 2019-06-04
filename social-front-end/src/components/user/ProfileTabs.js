import React, {Component} from 'react';
import {Tab, Tabs} from "react-mdl";
import {Link} from "react-router-dom";
import DefaultProfile from "./profile.jpg";
import './profileTab.css'

class ProfileTabs extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

    toggleApps() {
        const {following, followers} = this.props;
        if (this.state.activeTab === 0) {
            return (
                <div className="demo-list-action mdl-list" style={{padding: 0}}>
                    {followers.map((person, i) => (
                            <div key={i} className="mdl-list__item" style={{padding: '10px 0'}}>
                                <span className="mdl-list__item-primary-content">
                                  {/*<i className="material-icons mdl-list__item-avatar">person</i>*/}
                                    <Link to={`/user/${person._id}`}
                                          style={{color: '#000', textDecoration: 'none'}}>
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                             style={{ borderRadius: '50%',height: '30px', maxWidth: '30px' }} onError={i => {
                                            i.target.src = `${DefaultProfile}`
                                        }} alt={person.name}/>
                                        <span style={{paddingLeft: '10px'}}>{person.name}</span>
                                    </Link>
                                </span>
                            </div>
                        )
                    )}
                </div>
            )
        } else if (this.state.activeTab === 1) {
            return (
                <div className="demo-list-action mdl-list" style={{padding: 0}}>
                    {following.map((person, i) => (
                            <div className="mdl-list__item" style={{padding: '10px 0'}}>
                                <span className="mdl-list__item-primary-content">
                                    <Link to={`/user/${person._id}`}
                                          style={{color: '#000', textDecoration: 'none'}}>
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                             style={{ borderRadius: '50%', height: '30px', maxWidth: '30px' }} onError={i => {
                                            i.target.src = `${DefaultProfile}`
                                        }} alt={person.name}/>
                                    <span style={{paddingLeft: '10px'}}>{person.name}</span></Link>
                                </span>
                            </div>
                        )
                    )}
                </div>
            )
        } else if (this.state.activeTab === 2) {
            return (
                <div className="demo-list-action mdl-list" style={{padding: 0}}>
                </div>
            )
        }
    }

    render() {

        return (
            <div className="demo-tabs">
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>Followers</Tab>
                    <Tab>Following</Tab>
                    <Tab>Posts</Tab>
                </Tabs>
                <section>
                    <div className="content">{this.toggleApps()}</div>
                </section>
            </div>

        );
    }
}

export default ProfileTabs;