import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';// transition effect library for burger menu for ex

import './SideDrawer.css';

const SideDrawer = props => {
// Use props.children on components that represent ‘generic boxes’ and that don’t know their children ahead of time, which is the case for a sidebar
const content = (
    <CSSTransition in ={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
    {/* timeout for the duration of the animation, seconds */}
    {/* slide-in-left className is  used by the library CSSTransition in the css folder index.css*/}
    {/* By default the child component is mounted immediately along with the parent Transition component.After the first enter transition the component will stay mounted, even on "exited", unless I also specify unmountOnExit. */}
    <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};
// React DOM can do more than render a method.
// I can use React DOM.createPortal to tell React which content to render, where.
//  Here the place in the DOM where this content should be rendered when this component
// is mounted and used.
// I used the ID I just assigned there which is the drawer hook.  

export default SideDrawer;