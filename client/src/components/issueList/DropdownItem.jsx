import React from 'react';
import { PropTypes } from 'prop-types';

export default function DropdownItem({ id, value }) {
  return <li key={id}>{value}</li>;
}

DropdownItem.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};
