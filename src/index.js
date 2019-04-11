import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';

ReactDOM.render(
  <ul>
    {events.map(item => { // kod w {} to po prostu czysty JS
      return ( // jeśli zwracamy wiele linii jsx, powinniśmy owijać je w nawiasy
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
