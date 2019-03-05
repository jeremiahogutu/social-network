import React from 'react';
import {BrowserRouter} from "react-router-dom";
import MainRouter from "./MainRouter";

const App = () => (
    <div style={{paddingTop: '50px'}}>
        <BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    </div>

);

export default App;
