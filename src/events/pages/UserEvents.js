import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventList from '../components/EventList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

// const example_events =[
// {
//     id:'p1',
//     title:'Basement Theatre',
//     description: 'Here since 2 days, mood to visit a bit the city white other buddies',
//     imageUrl:'https://bit.ly/3ikLMau',
//     address:'Lower Greys Avenue,Auckland, New Zealand',
//     location:{
//         lat:-36.853539,
//         lng:174.762792,
//     },
//     creator:'u1'
// },
// {
//     id:'p2',
//     title:'The Glass Goose',
//     description: 'Want to form a groupe for Hiking',
//     imageUrl:'https://bit.ly/38ddKA0',
//     address:'28 Federal Street, Auckland,New Zealand',
//     location:{
//         lat:-36.848613,
//         lng:174.7627371,
//     },
//     creator:'u2'
// },
// ];


const UserEvents= () => {
    const [loadedEvents, setLoadedEvents] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId= useParams().userId;
    // use params return an object which has a dynamic segments set up in the route, so the > :userId from app.js, for example as properties
   
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:5000/api/events/user/${userId}`
            );
            setLoadedEvents(responseData.events);
          } catch (err) {}
        };
        fetchEvents();
      }, [sendRequest, userId]);

    const eventDeleteHandler = (deletedEventId) => {
      setLoadedEvents(prevEvents => prevEvents.filter(event => event.id !== deletedEventId));
    };

      return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedEvents && <EventList items={loadedEvents} onDeleteEvent={eventDeleteHandler}/>}
        </React.Fragment>
      );
    };
    

export default UserEvents;