import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewEvent.css';

const NewEvent = () => {
  return (
    <form className="event-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewEvent;
