import React, { useState } from 'react';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card';

import './EventItem.css'

const EventItem = props => {
    const [showMap, setShowMap] = useState(false);
    //showMap is initialy false so we don't show the model yet

    const openMapHandler = () => setShowMap(true);
    //open the map
    const closeMapHandler = () => setShowMap(false);
    //close the map

    return (
    <React.Fragment>
    {/* it won't  be rendered there, the portal both on the backdrop and modal overlay all to inject in a different place in the index.html file  */}
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
        //The cxl handler here is in the end of the function triggered in the backdrop in Modal.js when I click on {props.onCancel}
          header={props.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>Close</Button>}
        >
          <div className="map-container">
            <h2>Map</h2>
          </div>
        </Modal>
    <li className="event-item">
        <Card className="event-item__content">
        <div className="event-item__image">
            <img src={props.image} alt={props.title}/>
        </div>
        <div>
            <h2>Organised by {props.creatorId}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="event-item__actions">
            <Button inverse>View on map</Button>
            <Button to={'/event/${props.id}'}>Edit</Button>
            {/* here the 'id' of that event */}
            <Button danger>Delete</Button>
        </div>
        </Card>
    </li>
    </React.Fragment>
    );
};

export default EventItem;