import React from 'react';
import PropTypes from 'prop-types';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  state = { events: [] };

  componentDidMount() {
    const { events } = this.props;
    this.setState({
      events,
    });
  }

  render() {
    const { events } = this.state;

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
