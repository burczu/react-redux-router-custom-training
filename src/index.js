import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';

// import bez {}, ponieważ Events exportuje komponent jako "default"
import Events from './Events';

ReactDOM.render(
  // komponentów używamy tak jakby były "tagami" html
  // to co przekażemy do atrybutu `events` będzie
  // dostępne w obiekcie "props" funkcji `Events`
  <Events events={events} />,
  document.getElementById('root')
);
