import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import DropdownItem from './DropdownItem';

export default function Dropdown({ title, items }) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const itemList = items.map((v) => <DropdownItem id={v.id} value={v.value} />);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return (
    <div ref={dropdownRef}>
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
