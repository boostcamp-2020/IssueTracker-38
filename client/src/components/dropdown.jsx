import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

function DropdownItem({ id, value }) {
  return (
    <li key={id}>{value}</li>
  );
}
export default function Dropdown({ title, items }) {
  const [isActive, setIsActive] = useState(false);
  const itemList = items.map((v) => <DropdownItem id={v.id} value={v.value} />);
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

DropdownItem.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
