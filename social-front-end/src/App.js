import React from 'react';
import {NavLink} from "react-router-dom";
import MainRouter from "./MainRouter";
import {close, isAuthenticated, signout} from "./components/auth";


const App = () => (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header" style={{backgroundColor: '#2196f3'}}>
            <div className="mdl-layout__header-row">
                {/*Title*/}
                {isAuthenticated() && (
                <NavLink style={{textDecoration: "none", color: "#fff"}} to={`/user/${isAuthenticated().user._id}`} activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>
                    <span
                        className="mdl-layout-title">{isAuthenticated() ? `${isAuthenticated().user.name}'s profile` : "Social Network"}</span>
                </NavLink>
                )}
                {/*Add spacer, to align navigation to the right */}
                <div className="mdl-layout-spacer"/>
                {/*Navigation. We hide it in small screens.*/}
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                    <NavLink className="mdl-navigation__link" to="/" activeStyle={{fontWeight: "bold", color: "#f3ca86"}}
                             exact={true}>Home</NavLink>

                    {!isAuthenticated() && (
                        <>
                            <NavLink className="mdl-navigation__link" to="/signin"
                                     activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Sign In</NavLink>
                            <NavLink className="mdl-navigation__link" to="/signup"
                                     activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Sign Up</NavLink>
                        </>
                    )}
                    {isAuthenticated() && (
                        <div style={{display: 'flex'}}>
                            <NavLink className="mdl-navigation__link" to="/users"
                                     activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Users</NavLink>
                            <NavLink className="mdl-navigation__link" to="/findpeople"
                                     activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Find People</NavLink>
                            <NavLink className="mdl-navigation__link" to="/post/create"
                                     activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Create Post</NavLink>
                            <button
                                className="mdl-navigation__link"
                                style={{cursor: "pointer", color: "#fff", background: "transparent", border: "none"}}
                                onClick={() => signout(() => window.location.href = "http://localhost:3000/")}>Sign Out
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
        <div className="mdl-layout__drawer" onClick={close}>
            <span className="mdl-layout-title">Social Network</span>
            <nav className="mdl-navigation">
                <NavLink className="mdl-navigation__link" to="/" activeStyle={{fontWeight: "bold", color: "#f3ca86"}}
                         exact={true}>Home</NavLink>
                {!isAuthenticated() && (
                    <>
                        <NavLink className="mdl-navigation__link" to="/signin"
                                 activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Sign In</NavLink>
                        <NavLink className="mdl-navigation__link" to="/signup"
                                 activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Sign Up</NavLink>
                    </>
                )}
                {isAuthenticated() && (
                    <div>
                        <NavLink className="mdl-navigation__link" to="/users"
                                 activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Users</NavLink>
                        <NavLink className="mdl-navigation__link" to="/findpeople"
                                 activeStyle={{fontWeight: "bold", color: "#f3ca86"}}>Find People</NavLink>
                        <button
                            className="mdl-navigation__link"
                            style={{
                                cursor: "pointer",
                                color: "#757575",
                                background: "transparent",
                                border: "none",
                                textAlign: "left"
                            }}
                            onClick={() => signout(() => window.location.href = "http://localhost:3000/")}>Sign Out</button>
                    </div>
                )}
            </nav>
        </div>
        <main className="mdl-layout__content">
            <div className="page-content"><MainRouter/></div>
        </main>
    </div>
);
export default App;
