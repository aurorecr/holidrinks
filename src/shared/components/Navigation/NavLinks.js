import React from 'react';
import { NavLink } from 'react-router-dom';
// to analyse the URL in order to customize the link if we are on the page the link leads to

import './NavLinks.css';

const NavLinks = props => {
return <ul className="nav-links">
    <li>
        <NavLink to="/" exact>Find Holidrinks</NavLink>
    </li>
    <li>
        <NavLink to="/u1/events">Modify my Holidrinks</NavLink>
    </li>
    <li>
        <NavLink to="/events/new">Create a Holidrinks</NavLink>
    </li>
    <li>
        <NavLink to="/auth">Sign In</NavLink>
    </li>
</ul>
}; 

export default NavLinks;