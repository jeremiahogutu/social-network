import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from "./components/Home";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";

const MainRouter = () => (
    <div className="mdl-grid" style={{justifyContent: "center"}}>
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
        </Switch>
    </div>
);

export default MainRouter