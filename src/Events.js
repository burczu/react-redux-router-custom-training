import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import Filter from './Filter';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  state = { events: [], filter: '' };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);

    // oczywiście trzeba zbindować
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    const { events } = this.props;
    this.setState({
      events,
    });
  }

  clearHandler() {
    this.setState({
      events: [],
    });
  }

  deleteHandler(eventId) {
    const { events } = this.state;
    const filtered = events.filter((event) => event.id !== eventId);

    this.setState({
      events: filtered,
    });
  }

  handleFilter(event) {
    // aktualną wartość pola tekstowego można pobrać z obiektu `event`
    const { value } = event.target;

    // zmiana stanu, poza zapisaniem wartości powoduje ponowne renderowanie
    // drzewa komponentów, w tym komponentu `Filter` - to powoduję, że do
    // pola tekstowego przypisywana jest aktualna wartość stanu
    this.setState({
      filter: value,
    });
  };

  render() {
    const { events, filter } = this.state;

    return (
      <>
        <Filter filter={filter} onFilterChange={this.handleFilter} />
        <ul>
          {events.map(item => {
            const date = new Date(item.date);

            // zmieniony warunek: nie renderuj jeśli nazwa nie spełnia filtra
            if (date >= Date.now() && item.name.indexOf(filter) !== -1) {
              return <EventItem item={item} onDeleteItem={this.deleteHandler}/>;
            }

            return null;
          })}
        </ul>
        <button onClick={this.clearHandler}>Wyczyść</button>
      </>
    );
  }
}

export default Events;
