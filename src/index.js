import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';

ReactDOM.render(
  <ul>
    {events.map(item => {
      return (
        <li key={item.id}>
          <strong>{item.name}</strong><br />
          Gdzie: {item.place}<br />
          Kiedy: {item.date} - {item.time}
        </li>
      );
    })}
  </ul>,
  document.getElementById('root')
);
