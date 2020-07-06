import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// to avoid infinit loop in "setFormData" because it will set a new form instead of updating, I use "useEffect" hook to wrap the call  setFormData inside
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/components/util/validators';
import { useForm } from '../../shared/hooks/form.hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './EventForm.css';

// const EX_EVENTS = [
//     {
//         id:'p1',
//         title:'Basement Theatre',
//         description: 'Here since 2 days, mood to visit a bit the city white other buddies',
//         imageUrl:'https://bit.ly/3ikLMau',
//         address:'Lower Greys Avenue,Auckland, New Zealand',
//         location:{
//             lat:-36.853539,
//             lng:174.762792,
//         },
//         creator:'u1'
//     },
//     {
//         id:'p2',
//         title:'The Glass Goose',
//         description: 'Want to form a groupe for Hiking',
//         imageUrl:'https://bit.ly/38ddKA0',
//         address:'28 Federal Street, Auckland,New Zealand',
//         location:{
//             lat:-36.848613,
//             lng:174.7627371,
//         },
//         creator:'u2'
//     },
// ];

const UpdateEvent = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvent, setLoadedEvent] = useState();
  const eventId = useParams().eventId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  //set like that later when we connect to the backend it will show a loadinf spinner while the user is waiting for the event to load
  );


  useEffect(() =>{
    // so inside I put my function setFormData as useEffect will stop the loop
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/events/${eventId}`
        );
        setLoadedEvent(responseData.event);
        setFormData(
          {
            title: {
              value: responseData.event.title,
              isValid: true
            },
            description: {
              value: responseData.event.description,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest, eventId, setFormData]);

  
  const eventUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/events/${eventId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/' + auth.userId + '/events');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEvent&& !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the Holidrink!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedEvent && (
        <form className="event-form" onSubmit={eventUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedEvent.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedEvent.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Modify your Holidrink
          </Button>
                  {/* if the form is not valid then the button is disabled */}
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateEvent;

