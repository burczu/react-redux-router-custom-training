import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import Filter from './Filter';
import EventAdd from './EventAdd';
import { withLayout } from './hoc';
import { ButtonColorProvider, ButtonColorConsumer } from './context';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    toggleLayout: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
  };

  state = {
    events: [],
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

    // zmiana stanu, od którego zalezy provider spowoduje re-renderowanie
    // jego komponentów-dzieci, w tym konsumerów - to spowoduje, zmianę
    // koloru w komponentach konsumujących
    this.setState({
      buttonColor: buttonColor === 'green' ? 'yellow' : 'green',
    });
  }

  render() {
    const {
      events,
      filter,
      buttonColor,
    } = this.state;

    return (
      // całość owijamy providerem i przypisujemy mu wartość początkową,
      // którą trzymamy w stanie komponentu
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
          {/*
            wewnątrz konsumera mamy dostęp do wartości dostarczanej nam przez provider
            zmiana stanu w providerze, skutkuje re-renderowanie konsumera z nowa wartością
          */}
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
