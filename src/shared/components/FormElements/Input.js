import React, {useReducer, useEffect}from 'react';
//Use reducer allows you to manage state in a component and give a function that can be call which updates the state and re-renders the component, can manage more complex state than with use state
// useEffect allows to run some logic when the dependencies changes.It adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.

import {validate} from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
    //a userReducer received and current state that will be updated based on the action received wich is the 2nd arguments in the parantheses 
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
            // with the spread operator it copies the old state that is in inputeReducer=(state) and copies all key-value pairs of that old object into this new object > "...state".Then I can override selected keys, selected properties..So I store here the old value only here
          value: action.val,
          //here i store the new value, in this "val" property
          isValid: validate(action.val, action.validators)
          //action.validators is a key,not use yet, it's coming from the changeHandler where the change event is dispatched, it received a props.
        };
        case 'TOUCH': {
          //here I handle the touch case from "touchHandler" wrote below
          return{
          ...state,
          //"...state" return the state where I copy everything that is there, to not loose the enter value THEN i update with isTouched to true
          isTouched: true
          // "isTouched" is also in the initial state,below, so by default set to "false"
          }
        }
        default:
        return state;
    }
  };

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        //I destructure here stored in constants, 1st the current state and 2nd the dispatch function to be call
        //So I can dispatch actions to the reducer function which will run through the funtion and return a new state wich will update "inputState" and re-render the component in the end
        value: '',
        isTouched:false,
        //initial state of "isTouched"
        isValid: false
        //here initialy the input will be treated as false
      });
      
    const {id, onInput}= props;
    const {value, isValid}= inputState;

    useEffect(() => 
    {onInput (id,value, isValid)},
    // here I destructure juste above in const {id...  and const {value...So no need to write "props"on this line
    //whenever the function "onInput" change or the "id", or the "value", it will call the "onInput" props from the const, just above
    [id,value, isValid, onInput]);
    // in {} > is the function to be executed. In the [] is the array of dependencies

    const changeHandler = event => {
        //"event" is an object we get automatically on the change event in "onChange={changeHandler}" from textarea
        dispatch({ type: 'CHANGE', val: event.target.value, validators :props.validators });
        //i want to dispatch to this reducer, the identified has to be the same that in "case" in the swith methode, so it's CHANGE, now
        //"target" is the input element on which this event was triggered 
        //"target.value", value here is the value enter by the user
        //the all sentence is updating the state
        //validators is passed to the imput component wich is in the "const NewEvent" in component NewEvent.js
    
      };

      const touchHandler=()=> {
     dispatch({
       type: 'TOUCH'
        }); 
     //here I want to dispatch a new action
    };
    
      const element =
      //it's trigger everytime the user write something
        props.element === 'input' ? (
          <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            // The onblur event occurs when an object loses focus> when the cursor is far from the input filed.Onblur fires when a field loses focus, while onchange fires when that field's value changes. So it's when the user click in the input element then outside.So i need to show an error at this moment to say that user needs to write something inside.
            // {touchHandler}> point to the touchHandler wrote above
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
      className={`form-control ${!inputState.isValid && inputState.isTouched&&
        'form-control--invalid'}`}>
        {/* this class 'form-control--invalid' will be applied to this div if our input state is invalid, as it is initialy.It will be valid only after the user enter some characters*/}
        {/* It will be valid only as well id "isTouched" is true */}
      <label htmlFor={props.id}>{props.label}</label>
        {/* htmlFor is the same "for" as the one in JS, for form */}
      {element}
      {!inputState.isValid && inputState.isTouched&& <p>{props.errorText}</p>}
      {/* if the input is invalid, here we render an error message, that will be set outside, so I use props */}
    </div>
  );
};

export default Input;

