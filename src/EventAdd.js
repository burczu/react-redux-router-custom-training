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

  // zwróć uwagę na zdarzenie onSubmit formularza - wywoła się ono
  // w momencie kliknięcia przycisku typu "submit"
  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="name">
        Nazwa:
        {/*
          atrybut "name" ma taką samą wartość nazwa właściwości stanu
          przydaje się to później w metodzie `addInputHandler` (patrz komponent Events)
        */}
        <input type="text" id="name" name="name" value={name} onChange={onInputChange} />

        {/* zwróć uwagę, ze do właściwości style przekazujemy obiekt */}
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
      
      {/* przycisk typu "submit" - klinięcie wywołuje onSubmit formularza */}
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
