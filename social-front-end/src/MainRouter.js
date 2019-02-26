import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from "./components/Home";
import Signup from "./components/user/Signup";

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup}/>
        </Switch>
    </div>
);

export default MainRouter