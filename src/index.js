import ReactDOM from 'react-dom';

import events from './data/events.json';
import { getEvents } from './Events';

ReactDOM.render(getEvents(events), document.getElementById('root'));
