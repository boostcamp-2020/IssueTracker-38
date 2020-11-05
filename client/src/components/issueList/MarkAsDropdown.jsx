import React, {
  useState, useEffect, useRef, useCallback, useContext,
} from 'react';
import { PropTypes } from 'prop-types';
import { IssuesContext } from '../../stores/IssueStore';

import { issueAPI } from '../../apis/api';

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
  markAsButton: {
    display: 'block',
    background: 'white',
    border: 'none',
    height: '20px',
  },
};

export default function MarkAsDropdown({ selections }) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { dispatch } = useContext(IssuesContext);

  const onClick = () => setIsActive(!isActive);

  const handleMarkAsAction = (isClosed) => async () => {
    const result = await issueAPI.markAll(isClosed, selections);
    if (!result) return;
    selections.forEach((issueId) => dispatch({ type: 'UPDATE', payload: { id: issueId, isClosed } }));
  };

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
        Mark As
        <div css={styles.downArrow} />
      </button>
      <div css={{ ...styles.dropDown, display: isActive ? 'block' : 'none' }}>
        <p css={styles.title}>
          Actions
        </p>
        <div css={styles.content}>
          <button onClick={handleMarkAsAction(false)} css={styles.markAsButton} type="button">Open</button>
          <button onClick={handleMarkAsAction(true)} css={styles.markAsButton} type="button">Close</button>
        </div>
      </div>
    </div>
  );
}

MarkAsDropdown.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.number).isRequired,
};
