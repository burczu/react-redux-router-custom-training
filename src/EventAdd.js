import React from 'react';
import PropTypes from 'prop-types';
import { Form, Text } from 'informed';

const EventAdd = (props) => {
  const { onFormSubmit, getForm } = props;

  return (
    <Form onSubmit={onFormSubmit} getApi={getForm}>
      <label htmlFor="name">
        Nazwa:
        <Text id="name" field="name" />
      </label>
      <label htmlFor="place">
        Miejsce:
        <Text id="place" field="place" />
      </label>
      <label htmlFor="date">
        Data:
        <Text id="date" field="date" />
      </label>
      <label htmlFor="time">
        Godzina:
        <Text id="time" field="time" />
      </label>
      <button type="submit">Zapisz</button>
    </Form>
  );
};

EventAdd.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  getForm: PropTypes.func.isRequired,
};

export default EventAdd;
