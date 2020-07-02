import React, {useContext} from 'react';
//useContext creates a “context” at the top level and allows it to be “used” anywhere in the hierarchy.Avoid to update the prop at each child component so avoid time lost and errors
import { NavLink } from 'react-router-dom';
// to analyse the URL in order to customize the link if we are on the page the link leads to
import {AuthContext} from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
   const auth = useContext(AuthContext);
    
return <ul className="nav-links">
    {auth.isLoggedIn &&(
    <li>
        <NavLink to="/" exact>Find Holidrinks</NavLink>
    </li>
    )}
    {auth.isLoggedIn &&(
    <li>
        <NavLink to="/u1/events">Modify my Holidrinks</NavLink>
    </li>
    )}
    {auth.isLoggedIn &&(
    <li>
        <NavLink to="/events/new">Create a Holidrinks</NavLink>
    </li>
    )}
    {!auth.isLoggedIn &&(
    <li>
        <NavLink to="/auth">Sign In</NavLink>
    </li>
    )}
</ul>
}; 

export default NavLinks;