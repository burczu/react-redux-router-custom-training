import React from 'react';
import PropTypes from 'prop-types';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  // początkowy stan komponentu
  // definiujemy jako właściwość klasy
  state = { events: [] };

  // metoda cyklu życia komponentu
  // uruchamiana jeden raz, zaraz po
  // pierwszym wyrenderowaniu komponentu
  componentDidMount() {
    // tutaj bierzemy events z "propsów" czyli dostajemy z zewnątrz
    const { events } = this.props;

    // tylko wywołanie metody `setState` powoduje zmianę stanu
    // zmiana stanu powoduje ponowne renderowanie komponentu
    // już z nowymi wartościami stanu
    this.setState({
      events, // składnia ES6 - skrót od events: events
    });
  }

  render() {
    // przy pierwszym renderowaniu `events` to pusta tablica (patrz stan początkowy)
    // następnie w `componentDidMount` stan się zmienia i następuje drugie renderowanie
    const { events } = this.state;

    // przy pierwszym renderze zwracany jest `<ul></ul>`
    // przy kolejnym już `<ul><li></li>...</ul>`
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
