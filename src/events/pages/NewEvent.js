import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import {VALIDATOR_REQUIRE} from '../../shared/components/util/validators';

import './NewEvent.css';

const NewEvent = () => {
  return (
    <form className="event-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        //Import from > validators.js
        //With that we are sure the input is not empty, when the user fill up the form "validator_type_require" from > validators.js
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewEvent;
