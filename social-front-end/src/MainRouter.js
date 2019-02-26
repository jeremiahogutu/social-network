import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from "./components/Home";

const MainRouter = () => (
    <div>
        <switch>
            <Route path="/" component={Home} />
        </switch>
    </div>
);

export default MainRouter