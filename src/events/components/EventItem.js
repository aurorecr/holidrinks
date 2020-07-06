import React, { useState,useContext } from 'react';

// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import { useHttpClient } from '../../shared/hooks/form.hook';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import {AuthContext} from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


import './EventItem.css'

const EventItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
   //it will controle the buttons delete and cancel
  
    const [showMap, setShowMap] = useState(false);
    //showMap is initialy false so we don't show the model yet

    const[showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);
    //open the map
    const closeMapHandler = () => setShowMap(false);
    //close the map

    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
    
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
      setShowConfirmModal(false);
      try {
        await sendRequest(
          `http://localhost:5000/api/events/${props.id}`,
          'DELETE',
        null,
        {
          Authorization: 'Bearer' + auth.token
        }
        );
        props.onDelete(props.id);
      } catch (err) {}
    };
  

    return (
    <React.Fragment>
    {/* it won't  be rendered there, the portal both on the backdrop and modal overlay all to inject in a different place in the index.html file  */}
    <ErrorModal error={error} onClear={clearError} />
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
        //The cxl handler here is in the end of the function triggered in the backdrop in Modal.js when I click on {props.onCancel}
          header={props.address}
          contentClass="event-item__modal-content"
          footerClass="event-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>Close</Button>}>
            {/* button to close the modal */}
          <div className="map-container">
            <Map center={props.coordinates} zoom={16}/>
          </div>
        </Modal>

        <Modal 
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?" 
        footerClass="event-item__modal-actions" 
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}> Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}> Delete</Button>
          </React.Fragment>
        }>
          <p>Are you sure you want to delete your lovely Holidrink?</p>
        </Modal>

    <li className="event-item">
        <Card className="event-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="event-item__image">
            <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
        </div>
        <div>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        <div className="event-item__actions">
            <Button inverse onClick={openMapHandler}>View on map</Button>
            {/* openMapHandler > open the map when click on it, reaching the function at the top: "setShowMap(true)"*/}
            
            {auth.isLoggedIn &&(
             <Button to={`/events/${props.id}`}>Edit</Button>)}
            {/* here the 'id' of that event */}
            {/* only if the user is connected we can see Edit and Delete Button, so  if auth is true */}
            {auth.isLoggedIn && (<Button danger onClick={showDeleteWarningHandler}>Delete</Button>)}
        </div>
        </Card>
    </li>
    </React.Fragment>
    );
};

export default EventItem;