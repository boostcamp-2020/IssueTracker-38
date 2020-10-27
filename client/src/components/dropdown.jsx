import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import DropdownItem from './DropdownItem';

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export default function Dropdown({ title, items }) {
  const wrapperRef = useRef(null);
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
      wrapperRef.current.addEventListener('click', pageClickEvent);
    }
    return () => {
      wrapperRef.current.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return (
    <ModalWrapper ref={wrapperRef}>
      <button type="button" onClick={onClick}>
        {title}
        ▼
      </button>
      <div ref={dropdownRef} style={{ display: isActive ? 'block' : 'none' }}>
        <p>
          Filter by
          {' '}
          {title}
        </p>
        <ul>{itemList}</ul>
      </div>
    </ModalWrapper>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
