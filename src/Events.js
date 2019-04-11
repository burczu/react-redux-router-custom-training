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
    // nie ma potrzeby trzymać wartości pól i walidatorów
    // w stanie komponentu - wszystko obsługuje biblioteka
  };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addSubmitHandler = this.addSubmitHandler.bind(this);
    this.getAddForm = this.getAddForm.bind(this);
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

  addSubmitHandler(values) {
    // jak widać, nie ma obsługi wpisywania tekstu w pola tekstowe
    // wszystko to załatwia nam bibliteka

    const { events } = this.state;

    // wszystkie wartości formularza znajduja się w zmiennej `values`
    // pod nazwami podanymi w atrybutach `field`
    this.setState({
      events: [
        ...events,
        {
          // składania ES6, tzw. operator "spread"
          // pozwala na skopiowanie wszystkich wartości jednego obiektu do drugiego
          // np, jeśli values = { a: 1, b: 2 } to test = { ...values }
          // jest tożsame z: test = { a: values.a, b: values.b }
          ...values,
          id: events.length + 1,
        },
      ]
    }, () => {
      if (this.addForm) {
        this.addForm.reset();
      }
    });
  }

  getAddForm(form) {
    this.addForm = form;
  }

  render() {
    const {
      events,
      filter,
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
          onFormSubmit={this.addSubmitHandler}
          getForm={this.getAddForm}
        />
      </>
    );
  }
}

export default Events;
