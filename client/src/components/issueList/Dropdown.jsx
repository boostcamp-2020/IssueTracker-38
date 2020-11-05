import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { PropTypes } from 'prop-types';
import DropdownItem from './DropdownItem';

const styles = {
  dropDown: {
    position: 'absolute',
    border: '1px solid lightgray',
    padding: '5px',
    background: 'white',
  },
  button: {
    border: 'none',
    background: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#636363',
    marginLeft: '20px',
  },
  downArrow: {
    marginLeft: '2px',
    display: 'inline-block',
    width: '0',
    height: '0',
    verticalAlign: 'middle',
    content: '""',
    borderTopStyle: 'solid',
    borderTopWidth: '4px',
    borderRight: '4px solid transparent',
    borderBottom: '0 solid transparent',
    borderLeft: '4px solid transparent',
  },
  title: {
    borderBottom: '1px solid lightgray',
    margin: '0px',
  },
  content: {
    listStyle: 'none',
    margin: '5px 0 0 0',
    padding: '5px',
  },
};

export default function Dropdown({ title, items }) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const itemList = items.map(({ id, value }) => <DropdownItem id={id} value={value} />);

  const onClick = () => setIsActive(!isActive);

  const pageClickEvent = useCallback(({ target }) => {
    const { current } = dropdownRef;

    if (current !== null && !current.contains(target)) {
      setIsActive(!isActive);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return (
    <div ref={dropdownRef}>
      <button css={styles.button} type="button" onClick={onClick}>
        {title}
        <div css={styles.downArrow} />
      </button>
      <div css={{ ...styles.dropDown, display: isActive ? 'block' : 'none' }}>
        <p css={styles.title}>
          Filter by
          {' '}
          {title}
        </p>
        <ul css={styles.content}>
          {itemList}
        </ul>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
