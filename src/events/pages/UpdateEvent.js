import React from 'react';
// import { useParams } from 'react-router-dom';
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
        creator:'Julia'
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
  console.log(props,'props ?')

  const eventId=props.match.params.eventsId

  const identifiedEvent= EX_EVENTS.find(e => {
    console.log(eventId,'eventId here?')
    console.log(e.id,'e.id here?')

    return e.id === eventId
    
  });
  
  const [formState, inputHandler] = useForm({
    title:{
      value: identifiedEvent.title,
      isValid : true
    },
    description:{
      value: identifiedEvent.description,
      isValid : true
    },
  },true)
  

  if (!identifiedEvent) {
    return (
      <div className="center">
        <h2>Could not find this event!</h2>
      </div>
    );
  }

  return (
    <form className="event-form">
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