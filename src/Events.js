import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import Filter from './Filter';
import EventAdd from './EventAdd';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  state = {
    events: [],
    filter: '',
    name: '',
    nameValid: true,
    place: '',
    placeValid: true,
    date: '',
    dateValid: true,
    time: '',
    timeValid: true,
  };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addInputHandler = this.addInputHandler.bind(this);
    this.addSubmitHandler = this.addSubmitHandler.bind(this);
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
    const { value } = event.target;

    this.setState({
      filter: value,
    });
  }

  addInputHandler(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      [`${name}Valid`]: value.length > 0,
    });
  }

  addSubmitHandler(event) {
    event.preventDefault();

    const {
      events,
      name,
      nameValid,
      place,
      placeValid,
      date,
      dateValid,
      time,
      timeValid,
    } = this.state;

    if (nameValid && placeValid && dateValid && timeValid) {
      this.setState({
        events: [
          ...events,
          {
            id: events.length + 1,
            name,
            place,
            date,
            time,
          },
        ]
      }, () => {
        this.setState({
          name: '',
          place: '',
          date: '',
          time: '',
        });
      });
    }
  }

  render() {
    const {
      events,
      filter,
      name,
      nameValid,
      place,
      placeValid,
      date,
      dateValid,
      time,
      timeValid,
    } = this.state;

    return (
      <>
        <Filter filter={filter} onFilterChange={this.handleFilter} />
        <ul>
          {events.map(item => {
            const date = new Date(item.date);

            if (date >= Date.now() && item.name.indexOf(filter) !== -1) {
              return <EventItem key={item.id} item={item} onDeleteItem={this.deleteHandler}/>;
            }

            return null;
          })}
        </ul>
        <button onClick={this.clearHandler}>Wyczyść</button>
        <EventAdd
          name={name}
          nameValid={nameValid}
          place={place}
          placeValid={placeValid}
          date={date}
          dateValid={dateValid}
          time={time}
          timeValid={timeValid}
          onInputChange={this.addInputHandler}
          onFormSubmit={this.addSubmitHandler}
        />
      </>
    );
  }
}

export default Events;
