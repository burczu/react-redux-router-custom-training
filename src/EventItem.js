import React from 'react';
import PropTypes from 'prop-types';

const EventItem = (props) => {
  // obiekt wydarzenia i referencję do metody obsługi zdarzenia
  // dostajemy w obiekcie "props"
  const { item, onDeleteItem } = props;

  return (
    <li key={item.id}>
      <strong>{item.name}</strong><br />
      Gdzie: {item.place}<br />
      Kiedy: {item.date} - {item.time}
      {/*
        przycisk jest tutaj, ale metoda obsług zdarzenia znajduje się
        w komponencie rodzicu
      */}
      <button onClick={() => onDeleteItem(item.id)}>Usuń</button>
    </li>
  );
};

// pamiętaj o propTypes!
EventItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default EventItem;
