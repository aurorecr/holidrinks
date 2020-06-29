import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

//Backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs  etc..

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    // this function it expects to get on an on click prop on its own.
    document.getElementById('backdrop-hook')
    // backdrop hook will be place in the index.html file with the other hook
  );
};

export default Backdrop;

