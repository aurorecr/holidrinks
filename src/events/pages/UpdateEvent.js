import React, {useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom';
// to avoid infinit loop in "setFormData" because it will set a new form instead of updating, I use "useEffect" hook to wrap the call  setFormData inside
import { withRouter } from "react-router";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/util/validators';
import {useForm} from '../../shared/hooks/form.hook';
import './EventForm.css';

const EX_EVENTS = [
    {
        id:'p1',
        title:'Basement Theatre',
        description: 'Here since 2 days, mood to visit a bit the city white other buddies',
        imageUrl:'https://bit.ly/3ikLMau',
        address:'Lower Greys Avenue,Auckland, New Zealand',
        location:{
            lat:-36.853539,
            lng:174.762792,
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'The Glass Goose',
        description: 'Want to form a groupe for Hiking',
        imageUrl:'https://bit.ly/38ddKA0',
        address:'28 Federal Street, Auckland,New Zealand',
        location:{
            lat:-36.848613,
            lng:174.7627371,
        },
        creator:'u2'
    },
];

const UpdateEvent = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const eventId=props.match.params.eventsId

  const identifiedEvent= EX_EVENTS.find(e => {
    console.log(eventId,'eventId here?')
    console.log(e.id,'e.id here?')

    return e.id === eventId
    
  });
  
  const [formState, inputHandler, setFormData] = useForm({
    title:{
      value: '',
      isValid : false
    },
    description:{
      value: '',
      isValid : false
    },
    //set like that later when we connect to the backend it will show a loadinf spinner while the user is waiting for the place to load
  },false)
  
  useEffect(() =>{
    // so inside I put my function setFormData as useEffect will stop the loop
  setFormData({
    title:{
      value: identifiedEvent.title,
      isValid : true
    },
    description:{
      value: identifiedEvent.title,
      isValid : true
    },
  },true
  );
  setIsLoading(false);
  //once we set the form data it's not loading anymore
},[setFormData, identifiedEvent]);

  
  const eventUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!identifiedEvent) {
    return (
      <div className="center">
        <h2>Could not find this event!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
     <form className="event-form" onSubmit={eventUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
         />

      <Button type="submit" disabled={!formState.isValid}>
        {/* if the form is not valid then the button is disabled */}
        Update Holidrink
      </Button>
    </form>
  );
};

export default withRouter(UpdateEvent);