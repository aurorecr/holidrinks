import React from 'react';

import './Input.css';

const Input = props => {
  const element =
    props.element === 'input' ? (
        // if it recieved an input element it will load:
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
        // if it doesn't recieved an input element it will load:
      <textarea id={props.id} rows={props.rows || 3} />
    //   we set to 3, in case the rows property is not define
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {/* htmlFor is the same "for" as the one in JS, for form */}
      {element}
    </div>
  );
};

export default Input;
