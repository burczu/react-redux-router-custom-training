import React from 'react';
import PropTypes from 'prop-types';

class Events extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  state = { events: [] };

  constructor(props) {
    super(props);

    // musimy zbindować metodę `clearHandler` do this, w przeciwnym razie
    // wewnątrz tej metody `this` będzie równie `undefined`
    // najlepiej jest robić to w konstruktorze
    this.clearHandler = this.clearHandler.bind(this);
  }

  componentDidMount() {
    const { events } = this.props;
    this.setState({
      events,
    });
  }

  clearHandler() {
    // kiedy użytkownik kliknie przycisk
    // zmieniamy stan - ustawiamy `this.state.events` na pustą tablicę
    // to spowoduje kolejne renderowanie i usunięcie wydarzeń z ekranu
    this.setState({
      events: [],
    })
  }

  render() {
    const { events } = this.state;

    // zwróć uwage na tag <></> - komponenty zawsze musi zwracać jeden element
    // w tym przypadku mamy dwa elementy: <ul> oraz <button> i żeby uniknąć
    // konieczności owijania ich na przyklad w <div> możemy skorzystać z takiego "helpera"
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
