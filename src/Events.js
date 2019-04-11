import React from 'react';

// export bez słowa "default" oznacza,
// że tę będziemy importować z nawiasami klamrowymi:
// np.: `import { getEvents } from 'Events';`
export const getEvents = (events) => {
  // ^^ funkcja strzałkowa - odpowiednik `function getEvents(events) { ... }`

  return (
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
  );
};
