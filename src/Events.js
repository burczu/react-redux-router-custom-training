import React from 'react';
import PropTypes from 'prop-types';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  state = { events: [] };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
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
              return (
                <li key={item.id}>
                  <strong>{item.name}</strong><br />
                  Gdzie: {item.place}<br />
                  Kiedy: {item.date} - {item.time}
                  <button onClick={() => this.deleteHandler(item.id)}>Usuń</button>
                </li>
              );
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
