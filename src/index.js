import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';
import Events from './Events';

import './style.css';

ReactDOM.render(
  <Events events={events} />,
  document.getElementById('root')
);
