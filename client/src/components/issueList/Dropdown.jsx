import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { PropTypes } from 'prop-types';
import DropdownItem from './DropdownItem';

const styles = {
  dropDown: {
    position: 'absolute',
    border: '1px solid #eff1f3',
    background: 'white',
    boxShadow: '0px 0px 20px 5px #d2d2d2',
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
    padding: '10px',
    backgroundColor: '#f7f8fa',
    borderBottom: '1px solid #eff1f3',
  },
  content: {
    listStyle: 'none',
  },
};

export default function Dropdown({
  title, items, filters, setFilters,
}) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const updateFilter = (id) => {
    const newFilter = { ...filters };
    if (title === 'Label') {
      const wasSelected = newFilter[title].indexOf(id);
      if (wasSelected !== -1) newFilter[title].splice(wasSelected, 1);
      else newFilter[title].push(id);
    } else {
      const wasSelected = newFilter[title] === id;
      newFilter[title] = wasSelected ? null : id;
    }
    setFilters(newFilter);
  };

  const checkIsSelected = (id) => {
    if (title === 'Label' && filters[title].length !== 0) return filters[title].indexOf(id) !== -1;
    if (filters[title] && filters[title] === id) return true;
    return false;
  };

  const itemList = items.map(({ id, value }) => {
    const isSelected = checkIsSelected(id);
    return <DropdownItem id={id} value={value} isSelected={isSelected} onClick={updateFilter} />;
  });

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
  filters: PropTypes.shape.isRequired,
  setFilters: PropTypes.func.isRequired,
};
