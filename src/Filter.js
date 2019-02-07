import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const { filter, onFilterChange } = props;
  return (
    <input type="text" value={filter} onChange={onFilterChange} />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
