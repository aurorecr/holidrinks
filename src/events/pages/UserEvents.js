import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventList from '../components/EventList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserEvents= () => {
    const [loadedEvents, setLoadedEvents] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId= useParams().userId;
    // use params return an object which has a dynamic segments set up in the route, so the > :userId from app.js, for example as properties
   
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/events/user/${userId}`
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