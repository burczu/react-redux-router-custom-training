import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';

ReactDOM.render(
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
  </ul>,
  document.getElementById('root')
);
