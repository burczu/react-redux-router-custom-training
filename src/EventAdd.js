import React from 'react';
import PropTypes from 'prop-types';

const EventAdd = (props) => {
  const {
    name,
    nameValid,
    place,
    placeValid,
    date,
    dateValid,
    time,
    timeValid,
    onInputChange,
    onFormSubmit,
  } = props;

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="name">
        Nazwa:
        <input type="text" id="name" name="name" value={name} onChange={onInputChange} />
        <span className="error" style={{ display: nameValid ? 'none' : 'inline' }}>Pole wymagane</span>
      </label>
      <label htmlFor="place">
        Miejsce:
        <input type="text" id="place" name="place" value={place} onChange={onInputChange} />
        <span className="error" style={{ display: placeValid ? 'none' : 'inline' }}>Pole wymagane</span>
      </label>
      <label htmlFor="date">
        Data:
        <input type="text" id="date" name="date" value={date} onChange={onInputChange} />
        <span className="error" style={{ display: dateValid ? 'none' : 'inline' }}>Pole wymagane</span>
      </label>
      <label htmlFor="time">
        Godzina:
        <input type="text" id="time" name="time" value={time} onChange={onInputChange} />
        <span className="error" style={{ display: timeValid ? 'none' : 'inline' }}>Pole wymagane</span>
      </label>
      <button type="submit">Zapisz</button>
    </form>
  );
};

EventAdd.propTypes = {
  name: PropTypes.string.isRequired,
  nameValid: PropTypes.bool.isRequired,
  place: PropTypes.string.isRequired,
  placeValid: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  dateValid: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  timeValid: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default EventAdd;
