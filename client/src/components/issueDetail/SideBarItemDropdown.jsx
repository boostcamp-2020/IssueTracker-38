import React from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';

const styles = {
  layout: {
    position: 'absolute',
    border: '1px solid',
    padding: '10px',
    background: 'white',
  },
  item: {
    border: 'none',
    background: 'white',
  },
};

export default function SideBarItemDropdown({ items, assigned }) {
  const { issueId } = useParams();

  const handleAssigning = (id) => () => {
    // TODO: 해당 이슈에 지정하는 API 로직 구현
    console.log('issueId: ', issueId, 'assigned: ', id);
  };

  const isAlreadyAssigned = (id) => assigned.find((base) => base.id === id);

  return (
    <div css={styles.layout}>
      {items.map(({ id, itemName }) => (
        <div>
          {isAlreadyAssigned(id)
            ? <span css={{ color: 'black' }}>v </span>
            : <span css={{ color: 'white' }}>v </span>}
          <button
            onClick={handleAssigning(id)}
            css={styles.item}
            type="button"
            key={id}
          >
            {itemName}
          </button>
        </div>
      ))}
    </div>
  );
}

SideBarItemDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
};
