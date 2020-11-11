import React from 'react';

export default function ColorChangeInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
