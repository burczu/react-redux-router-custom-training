import React from 'react';
import PropTypes from 'prop-types';
import { ButtonColorConsumer } from './context';

const EventItem = (props) => {
  const { item, onDeleteItem } = props;

  return (
    <li key={item.id}>
      <strong>{item.name}</strong><br />
      Gdzie: {item.place}<br />
      Kiedy: {item.date} - {item.time}
      <ButtonColorConsumer>
        {buttonColor =>
          <button
            style={{ background: buttonColor }}
            onClick={() => onDeleteItem(item.id)}
          >
            Usuń
          </button>
        }
      </ButtonColorConsumer>
    </li>
  );
};

EventItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default EventItem;
