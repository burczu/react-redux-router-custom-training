import React from 'react';
import PropTypes from 'prop-types';

// komponent to funkcja, której nazwa pisana jest z wielkiej litery
const Events = (props) => {
  // obiekt props zawiera wartości parametrów przekazanych
  // przy wywołaniu komponentu w komponencie rodzicu (sprawdź w `index.js`)
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

// pamiętaj o propTypes - w ten sposób skontrolujesz
// czy dane przekazane do komponentu mają odpowiedni typ!
Events.propTypes = {
  events: PropTypes.array.isRequired,
};

// export z użyciem "default"
// tym razem import wyglądać będzie tak (brak {}):
// `import Events from 'Events'` (sprawdź w `index.js`)
export default Events;
