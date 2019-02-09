import React from 'react';
import PropTypes from 'prop-types';
import { Form, Text } from 'informed';

const validateRequired =
    value => !value || value.length === 0 ? 'Pole jest wymagane' : undefined;

const EventAdd = (props) => {
  const { onFormSubmit, getForm } = props;

  return (
    <Form onSubmit={onFormSubmit} getApi={getForm}>
      {({ formState }) => (
        <>
          <label htmlFor="name">
            Nazwa:
            <Text id="name" field="name" validate={validateRequired} />
            {formState.errors.name && <span className="error">{formState.errors.name}</span>}
          </label>
          <label htmlFor="place">
            Miejsce:
            <Text id="place" field="place" validate={validateRequired} />
            {formState.errors.name && <span className="error">{formState.errors.name}</span>}
          </label>
          <label htmlFor="date">
            Data:
            <Text id="date" field="date" validate={validateRequired} />
            {formState.errors.name && <span className="error">{formState.errors.name}</span>}
          </label>
          <label htmlFor="time">
            Godzina:
            <Text id="time" field="time" validate={validateRequired} />
            {formState.errors.name && <span className="error">{formState.errors.name}</span>}
          </label>
          <button type="submit">Zapisz</button>
        </>
      )}
    </Form>
  );
};

EventAdd.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  getForm: PropTypes.func.isRequired,
};

export default EventAdd;
