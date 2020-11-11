import React from 'react';

import { PropTypes } from 'prop-types';

export default function ColorChangeInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

ColorChangeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
