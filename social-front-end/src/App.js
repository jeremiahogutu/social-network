import React from 'react';
import {Link} from "react-router-dom";
import MainRouter from "./MainRouter";

const App = () => (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                {/*Title*/}
                <span className="mdl-layout-title">Social Network</span>
                {/*Add spacer, to align navigation to the right */}
                <div className="mdl-layout-spacer"/>
                {/*Navigation. We hide it in small screens.*/}
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                    <Link className="mdl-navigation__link" to="/">Home</Link>
                    <Link className="mdl-navigation__link" to="/signin">Sign In</Link>
                    <Link className="mdl-navigation__link" to="/signup">Sign Up</Link>
                    {/*<a className="mdl-navigation__link" href="">Link</a>*/}
                    {/*<a className="mdl-navigation__link" href="">Link</a>*/}
                </nav>
            </div>
        </header>
        <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Social Network</span>
            <nav className="mdl-navigation">
                <Link className="mdl-navigation__link" to="/">Home</Link>
                <Link className="mdl-navigation__link" to="/signin">Sign In</Link>
                <Link className="mdl-navigation__link" to="/signup">Sign Up</Link>
                {/*<a className="mdl-navigation__link" href="">Link</a>*/}
            </nav>
        </div>
        <main className="mdl-layout__content">
            <div className="page-content"><MainRouter/></div>
        </main>
    </div>
);

export default App;
