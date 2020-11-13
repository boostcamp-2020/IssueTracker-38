import React from 'react';

import { PropTypes } from 'prop-types';

const style = {
  height: '25px',
  fontSize: '16px',
  margin: '5px',
  width: '100px',
};

export default function ColorChangeInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      css={style}
    />
  );
}

ColorChangeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
