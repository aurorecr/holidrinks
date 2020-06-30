import React, {useState} from 'react';
// to manage the state where the drawer is opened or not i need to import >userState
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop'

import './MainNavigation.css';


const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    // I set drawer is open as a function to update that state, it's false by default so it's closed

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
        // here i change the value from previous ligne, that was false by default to > true so it open the burger
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
        // when this const is called it will close the menu burger
    };

    return( 
        <React.Fragment>
        {/* with JS,we can have just one route Jsx element per component, so r.fragment wrapper allow this requirement of having one root element and then in there, we can several elements side by side/nested    */}
         { drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
         {/* if drawerIsOpen render the Backdrop, on click > close the burger menu */}
         {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

            {/* means if this (drawerIsOpen) is true then execute the code in those curly bracket, using sign && insteaf of "?"and ":" */}
           <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
           <nav className="main-navigation__drawer-nav">
             <NavLinks />
           </nav>
         </SideDrawer>
   
            
            <MainHeader>
            <h1 className="main-navigation__title">
                    <Link to="/">HOLIDRINKS</Link>
                </h1>

                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <nav className="main-navigation__header-nav">
                    <NavLinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
    )
};

export default MainNavigation;