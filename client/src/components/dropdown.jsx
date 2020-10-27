import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

export default function Dropdown({ title, items }) {
  const [isActive, setIsActive] = useState(false);
  const itemList = items.map((v) => <li key={v.id}>{v.value}</li>);
  const onClick = () => setIsActive(!isActive);

  return (
    <div>
      <button type="button" onClick={onClick}>
        {title}
        ▼
      </button>
      <div style={{ display: isActive ? 'block' : 'none' }}>
        <p>
          Filter by
          {' '}
          {title}
        </p>
        <ul>{itemList}</ul>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
