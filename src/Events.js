import React from 'react';
import PropTypes from 'prop-types';

const Events = (props) => {
  const { events } = props;

  return (
    <ul>
      {events.map(item => {
        const date = new Date(item.date);

        if (date >= Date.now()) {
          return (
            <li key={item.id}>
              <strong>{item.name}</strong><br />
              Gdzie: {item.place}<br />
              Kiedy: {item.date} - {item.time}
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};

Events.propTypes = {
  events: PropTypes.array.isRequired,
};

export default Events;
