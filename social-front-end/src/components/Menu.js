import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
};

export default Menu;