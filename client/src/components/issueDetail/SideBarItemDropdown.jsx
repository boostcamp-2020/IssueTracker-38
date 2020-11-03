import React from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';

import { issueAPI } from '../../apis/api';

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

  const handleAssigning = (id) => async () => {
    const type = isAlreadyAssigned(id) ? 'delete' : 'add';

    if (title === 'Assignees') {
      issueAPI.update({ id: issueId, assignee: { type, id } });
      return;
    }

    if (title === 'Labels') {
      issueAPI.update({ id: issueId, label: { type, id } });
      return;
    }

    if (title === 'Milestone') {
      if (type === 'add') {
        issueAPI.update({ id: issueId, milestoneId: id });
        return;
      }

      issueAPI.update({ id: issueId, milestoneId: null });
    }
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
