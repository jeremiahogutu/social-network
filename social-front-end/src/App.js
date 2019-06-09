import React, {Component} from 'react';
import MainRouter from "./MainRouter";
import SwipeableTemporaryDrawer from "./components/ui-helpers/SwipeableTemporaryDrawer";
import "./App.css"

class App extends Component {
    render() {
        return (
            <div style={{flexGrow: 1}}>
                <SwipeableTemporaryDrawer/>
                <main className="mdl-layout__content">
                    <div className="page-content"><MainRouter/></div>
                </main>
            </div>
            )
    }
}


export default App;
