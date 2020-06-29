import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import EventItem from './EventItem';

import './EventList.css'

const EventList = props => {
  if (props.items.lenght === 0){
    // props to the array of events(items) here I have 0 of them
      return (
      <div className="event-list center">
        <Card>
            <h2>You have no Holidrinks yet.Let's plan some!</h2>
            <button>Plan a Holidrink</button>
        </Card>
      </div>
      );
  }
  return (
  <ul className="event-list">
      {props.items.map(event =>( 
      <EventItem 
        Key={event.id} 
        id={event.id} 
        image={event.imageUrl}
        description={event.description} 
        address={event.address} 
        creatorId={event.creator} 
        coordinates={event.location}/>
        ))}
      {/* map to go through each event and load them here */}
  </ul>)
};

export default EventList;