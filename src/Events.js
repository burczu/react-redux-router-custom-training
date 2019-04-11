import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  state = { events: [] };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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

  render() {
    const { events } = this.state;

    return (
      <>
        <ul>
          {events.map(item => {
            const date = new Date(item.date);

            if (date >= Date.now()) {
              {/*
                użycie komponentu EventItem - dane wydarzenia oraz
                referencję do metody obsługi zdarzenia przekazujemy
                jako parametry komponentu (będą w nim dostępne w obiekcie "props")
              */}
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
