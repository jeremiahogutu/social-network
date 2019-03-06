import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import MainRouter from "./MainRouter";

const App = (props) => (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                {/*Title*/}
                <span className="mdl-layout-title">Social Network</span>
                {/*Add spacer, to align navigation to the right */}
                <div className="mdl-layout-spacer"/>
                {/*Navigation. We hide it in small screens.*/}
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                    <NavLink className="mdl-navigation__link" to="/home" activeStyle={{fontWeight: "bold", color: "red"}}>Home</NavLink>
                    <NavLink className="mdl-navigation__link" to="/signin" activeStyle={{fontWeight: "bold", color: "red"}}>Sign In</NavLink>
                    <NavLink className="mdl-navigation__link" to="/signup" activeStyle={{fontWeight: "bold", color: "red"}}>Sign Up</NavLink>
                </nav>
            </div>
        </header>
        <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Social Network</span>
            <nav className="mdl-navigation">
                <NavLink className="mdl-navigation__link" to="/home" activeStyle={{fontWeight: "bold", color: "red"}}>Home</NavLink>
                <NavLink className="mdl-navigation__link" to="/signin" activeStyle={{fontWeight: "bold", color: "red"}}>Sign In</NavLink>
                <NavLink className="mdl-navigation__link" to="/signup" activeStyle={{fontWeight: "bold", color: "red"}}>Sign Up</NavLink>
            </nav>
        </div>
        <main className="mdl-layout__content">
            <div className="page-content"><MainRouter/></div>
        </main>
    </div>
);

export default withRouter(App);
