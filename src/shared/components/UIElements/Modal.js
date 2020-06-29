import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';
// I can have 2 components in the same files.Modal component will use the ModalOverlay,this one will be seen on the screen


const ModalOverlay = props => {
    const content = (
<div className={`modal ${props.className}`} style={props.style}>
    <header className={`modal__header ${props.headerClass}`}>
        {/* with ${props... > so by using the modal, I can also add my classes to the modal  */}
        <h2>{props.header}</h2>
    </header>

     <form onSubmit={ props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
     {/* in case this form give the possibility to add content that is automatically wrapped in it */}
     {/* if I render any buttons inside of that form it will not reload the page when I submit */}
      <div className={`modal__content ${props.contentClass}`}>
        {props.children}
      </div>

      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>

    </form>
  </div>
);
 return ReactDOM.createPortal( document.getElementById('modal-hook'));
};
//Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component. Added in index.html

const Modal = props => {
  return (
    <React.Fragment>
        {/* React.Fragment for sibling top level elements  */}
      {props.show && <Backdrop onClick={props.onCancel} />}
      {/* if there is a show prop it will render the backdrop and
        on the backdrop, we can click and I will not trigger an on cancel method or function which I receive on */}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal">
        <ModalOverlay {...props} />
        {/* here it forward all the props get from outside to modal overlay */}
        {/* {...props} is the spread operator that takes all the key-value pairs of the props object and spreads them as attributes in the modal overlay> to create a general modal  */}
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
