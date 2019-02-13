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
    this.setState({
      loading: true,
      error: false,
    });

    axios.get('http://frontendinsights.com/events.json')
      .then(response => {
        this.setState({
          events: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
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

    if (loading) {
      return <p>Ładowanie danych...</p>;
    }

    if (error) {
      return <p style={{ color: 'red' }}>{errorMessage}</p>;
    }

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
