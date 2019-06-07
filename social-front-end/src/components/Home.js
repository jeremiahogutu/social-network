import React from 'react'
import Posts from '../components/post/Posts'
const Home = () => (
    <div className='mdl-grid' style={{justifyContent: 'center'}}>
        <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone" >
            {/*<h2>Home</h2>*/}
            {/*<p>Social front end</p>*/}
            <Posts/>
        </div>
    </div>
);

export default Home;