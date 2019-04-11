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
    // początkowe wartości pól tekstowych i walidatorów
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
    // oprócz value, również atrybut name możemy wyciągnąć z obiektu event
    const { value, name } = event.target;

    this.setState({
      // składnia ES6 pozwalająca pobierać nazwy właściwości obiektu ze zmiennej:
      // np. jeśli name = 'test' to { [name]: value } jest tożsame z { test: value }
      [name]: value,
      // tak samo, tylko dodatkowo wykorzystano paramtryzację ciągów znaków:
      // np. jeśli name = 'test' to text = `${name} text` jest tożsame z
      // text = 'test text'
      [`${name}Valid`]: value.length > 0,
    });
  }

  addSubmitHandler(event) {
    event.preventDefault();

    // potwierdzając formularz korzystamy z wartości,
    // które zapisaliśmy w stanie aplikacji
    // formularz sam w sobie nie trzyma żadnych danych
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

    // sprawdzenie walidatorów przed wysłaniem formularza
    if (nameValid && placeValid && dateValid && timeValid) {
      // tutaj tylko dodanie danych do stanu
      // w "prawdzimy życiu" mogłoby to być wywołanie
      // endpointa w API
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
        // do setState można przekazać callback
        // który wykona się po zakończeniu zmiany stanu
        // ---
        // wykorzystujemy go do wyczyszczenia formularza
        // poprzez wyczyszczenie stanu powiązanego z polami formularza
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
