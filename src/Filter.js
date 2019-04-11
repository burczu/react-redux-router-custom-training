import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const { filter, onFilterChange } = props;

  // pole tekstowe jest "controlled" tzn. zarówno `value` jak i `onChange`
  // jest kontrolowane przez nas: do `value` przypisujemy aktualną wartość
  // filtra; do `onChange` metodę obsługi zmiany wartości w polu tekstowym
  // ---
  // działa to tak: pole jest puste; wpisujemy literę, wywoływane jest `onChnage`,
  // które zmienia stan; to powoduje re-render z nową wartością stanu; nowa wartość
  // jest przypisywana do `value` i w ten sposób pojawia się w polu tekstowym
  return (
    <input type="text" value={filter} onChange={onFilterChange} />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
