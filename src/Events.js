import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import Filter from './Filter';
import EventAdd from './EventAdd';
import { withLayout } from './hoc';
import { ButtonColorProvider, ButtonColorConsumer } from './context';
import axios from 'axios';

class Events extends React.Component {
  static propTypes = {
    toggleLayout: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
  };

  state = {
    events: [],
    loading: true,
    error: false,
    errorMessage: '',
    filter: '',
    buttonColor: 'green',
  };

  constructor(props) {
    super(props);

    this.clearHandler = this.clearHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addSubmitHandler = this.addSubmitHandler.bind(this);
    this.getAddForm = this.getAddForm.bind(this);
    this.toggleLayout = this.toggleLayout.bind(this);
  }

  componentDidMount() {
    // przed pobieraniem danych włączamy loader
    this.setState({
      loading: true,
      error: false,
    });

    // danych o wydarzeniach nie pobieramy już z props, tylko ze zdalnej lokacji
    axios.get('http://frontendinsights.com/events.json')
      .then(response => {
        // kiedy pobieranie się zakończy, zmieniamy stan
        // przypisując pobrane dane i resetując loader
        this.setState({
          events: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        // w przypadku blędu resetujemy laoder i ustawiamy blad
        this.setState({
          loading: false,
          error: true,
          errorMessage: error.message,
        });
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
    const { events } = this.state;

    this.setState({
      events: [
        ...events,
        {
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

  toggleLayout(){
    const { buttonColor } = this.state;
    const { toggleLayout } = this.props;

    toggleLayout();
    this.setState({
      buttonColor: buttonColor === 'green' ? 'yellow' : 'green',
    });
  }

  render() {
    const {
      events,
      loading,
      error,
      errorMessage,
      filter,
      buttonColor,
    } = this.state;

    // podczas ladowania danych pokazujemy komunikat, a nie pustą listę
    if (loading) {
      return <p>Ładowanie danych...</p>;
    }

    // w przypadku błędu pokazujemy komunikat zamiast listy
    if (error) {
      return <p style={{ color: 'red' }}>{errorMessage}</p>;
    }

    // jeśli nie ładujemy, ani nie ma błędów pokazujemy listę
    return (
      <ButtonColorProvider value={buttonColor}>
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
        <ButtonColorConsumer>
          {buttonColor => (
            <>
              <button
                style={{ background: buttonColor }}
                onClick={this.clearHandler}
              >
                Wyczyść
              </button>
              <EventAdd
                onFormSubmit={this.addSubmitHandler}
                getForm={this.getAddForm}
              />
              <button
                style={{ background: buttonColor }}
                onClick={this.toggleLayout}
              >
                Zmień layout
              </button>
            </>
          )}
        </ButtonColorConsumer>
      </ButtonColorProvider>
    );
  }
}

export default withLayout(Events);
