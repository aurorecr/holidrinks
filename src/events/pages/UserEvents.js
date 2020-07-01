import React from 'react';
import {useParams} from 'react-router-dom';
// to find place by id I use> useParams
import EventList from '../components/EventList';

const example_events =[
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

const UserEvents= () => {
    const userId= useParams().userId;
    // use params return an object which has a dynamic segments set up in the route, so the > :userId from app.js, for example as properties
    const loadedEvents = example_events.filter(event =>event.creator === userId);
    // that will load events by user
    return <EventList items={loadedEvents}/>
};

export default UserEvents;