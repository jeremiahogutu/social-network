import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from "./components/Home";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Menu from "./components/Menu";

const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
        </Switch>
    </div>
);

export default MainRouter