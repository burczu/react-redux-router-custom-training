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
    })
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
