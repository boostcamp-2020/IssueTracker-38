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

export default function SideBarItemDropdown({ items, assigned, title }) {
  const { issueId } = useParams();

  const isAlreadyAssigned = (id) => assigned.find((base) => base.id === id);

  const handleAssigning = (id) => () => {
    /* TODO: API 로직 구현
     * isAlreadyAssigned(id) 함수를 사용하여 새롭게 추가하는 건지, 제거하는 건지 구분
     * issueId에 해당하는 항목(title : Assignee, Label, Milestone)을 골라서 id에 맞게 어사인해줌
     */
  };

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
  title: PropTypes.string.isRequired,
};
