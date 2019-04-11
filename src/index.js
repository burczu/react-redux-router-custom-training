import ReactDOM from 'react-dom';

import events from './data/events.json';

// moduł "Events" exportuje metodę getEvents bez słowa "default"
// dlatego przy imporcie stosujemy {}
import { getEvents } from './Events';

ReactDOM.render(getEvents(events), document.getElementById('root'));
