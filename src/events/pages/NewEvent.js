import React, {useCallBack , useReducer} from 'react';
// If I setup two useState hooks & declare two functions to handle state changes when I invoke a function and re-render happens, a new instance of both of these functions will be created. The instance of the other function will also be created. So with several function  many instance will be created during each re-render and will causes performance issues like infinity loop. seCallback helps stop that. It will cache/memoized function we pass into it and stop a new instance to be created for the other function.
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/components/util/validators';

import './NewEvent.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        //thoses state are input property, so here I go through all the input stored there using for in loop as it's an object
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
          //formIsValid is the previous value that I combine with the new validity "action.isValid"
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
          // this update one of the field in the input "state.inputs"
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewEvent = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });// this is the initial state that needs  to be update in the reducer

  const inputHandler = useCallBack((id,value,isValid) => {
  //this function will received the id of the input that changed, value and answer whether it's valid or not
  dispatch({
    type: 'INPUT_CHANGE',
    value: value,
    isValid: isValid,
    inputId: id,
   });
 }, []);

 const placeSubmitHandler = event => {
  event.preventDefault();
  console.log(formState.inputs); // send this to the backend!
};

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        //Import from > validators.js
        //With that we are sure the input is not empty, when the user fill up the form "validator_type_require" from > validators.js
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
       <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}> 
             {/* On the button I set disabled equal to not form state is valid,so when the form is not valid, the button should be disabled */}
        Add a Holidrink
      </Button>
    </form>
  );
};

export default NewEvent;

