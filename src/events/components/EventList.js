import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import EventItem from './EventItem';
import Button from '../../shared/components/FormElements/Button';

import './EventList.css'

const EventList = props => {
  if (props.items.lenght === 0){
    // props to the array of events(items) here I have 0 of them
      return (
      <div className="event-list center">
        <Card>
            <h2>You have no Holidrinks yet.Let's plan some!</h2>
            <Button to="/events/new">Plan a Holidrink</Button>
        </Card>
      </div>
      );
  }
  return (
  <ul className="event-list">
      {props.items.map(event =>( 
      <EventItem 
        key={event.id} 
        id={event.id} 
        image={event.image}
        title={event.title}
        description={event.description} 
        address={event.address} 
        creatorId={event.creator} 
        coordinates={event.location}
        onDelete={props.onDeleteEvent}
        />
        ))}
      {/* map to go through each event and load them here */}
  </ul>
  );
};

export default EventList;