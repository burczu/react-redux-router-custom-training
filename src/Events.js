import React from 'react';
import PropTypes from 'prop-types';

// komponenty można też definiowac jako klasy
// powinny wtedy dzidziczyć z klasy `React.Component`
class Events extends React.Component {
  // w komponencie "klasowym" propTypes
  // możemy zdefiniować jako właściwość statyczną
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  // kod z komponentu funkcyjnego trafia do metody `render` 
  render() {
    const { events } = this.props;

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
  }
}

export default Events;
