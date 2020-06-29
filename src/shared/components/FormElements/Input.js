import React, {useReducer}from 'react';
//Use reducer allows you to manage state in a component and give a function that can be call which updates the state and re-renders the component, can manage more complex state than with use state

import './Input.css';

const inputReducer = (state, action) => {
    //a userReducer received and current state that will be updated based on the action received wich is the 2nd arguments in the parantheses 
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
            // with the spread operator it copies the old state that is in inputeReducer=(state) and copies all key-value pairs of that old object into this new object > "...state".Then I can override selected keys, selected properties..So I store here the old value
          value: action.val,
          //here i store the new value, in this "val" property
          isValid: true
        };
      default:
        return state;
    }
  };

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        //I destructure here stored in constants, 1st the current state and 2nd the dispatch function to be call
        //So I can dispatch actions to the reducer function which will run through the funtion and return a new state wich will update "inputState" and re-render the component in the end
        value: '',
        isValid: false
        //here initialy the input will be treated as false
      });

    const changeHandler = event => {
        //"event" is an object we get automatically on the change event in "onChange={changeHandler}" from textarea
        dispatch({ type: 'CHANGE', val: event.target.value });
        //i want to dispatch to this reducer, the identified has to be the same that in "case" in the swith methode, so it's CHANGE, now
        //"target" is the input element on which this event was triggered 
        //"target.value", value here is the value enter by the user
        //the all sentence is updating the state
    
      };
    //it's trigger everytime the user write something
      const element =
        props.element === 'input' ? (
          <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
          />
        ) : (
          <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
          />
        );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        'form-control--invalid'}`}>
        {/* this class 'form-control--invalid' will be applied to this div if our input state is invalid, as it is initialy.It will be valid only after the user enter some characters*/}
      <label htmlFor={props.id}>{props.label}</label>
        {/* htmlFor is the same "for" as the one in JS, for form */}
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
      {/* if the input is invalid, here we render an error message, that will be set outside, so I use props */}
    </div>
  );
};

export default Input;

