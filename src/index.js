import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';
import Events from './Events';

// style zaimportowane globalnie
import './style.css';

ReactDOM.render(
  <Events events={events} />,
  document.getElementById('root')
);
