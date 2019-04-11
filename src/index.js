import React from 'react';
import ReactDOM from 'react-dom';

import events from './data/events.json';

ReactDOM.render(
  <ul>
    {events.map(item => {
      const date = new Date(item.date);

      // jeśli data większa niż dzisiaj zwróć element <li>
      if (date >= Date.now()) {
        return (
          <li key={item.id}>
            <strong>{item.name}</strong><br />
            Gdzie: {item.place}<br />
            Kiedy: {item.date} - {item.time}
          </li>
        );
      }

      // w przeciwnym razie, po prostu zwracamy `null`
      return null;
    })}
  </ul>,
  document.getElementById('root')
);

// w efekcie, metoda map() zwróci tablicę w stylu [<li></li>, null, <li></li>]
// wyrenderują się natomiast tylko elementy listy - null'e zostaną pominięte
