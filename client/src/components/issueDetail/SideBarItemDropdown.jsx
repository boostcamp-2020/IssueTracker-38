import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../stores/IssueStore';

import { getItemById } from '../../utils/utils';

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
  const { issues, dispatch } = useContext(IssuesContext);

  const isAlreadyAssigned = (id) => assigned.find((base) => base.id === id);

  const handleAssigning = (id) => async () => {
    const type = isAlreadyAssigned(id) ? 'delete' : 'add';
    const targetIssue = { ...getItemById(issues, +issueId) };

    if (title === 'Assignees') {
      if (type === 'add') {
        targetIssue.assignees.push(id);
      } else {
        const index = targetIssue.assignees.indexOf(id);
        targetIssue.assignees.splice(index, 1);
      }

      dispatch({ type: 'UPDATE', payload: targetIssue });
      issueAPI.update({ id: issueId, assignee: { type, id } });
      return;
    }

    if (title === 'Labels') {
      if (type === 'add') {
        targetIssue.labels.push(id);
      } else {
        const index = targetIssue.labels.indexOf(id);
        targetIssue.labels.splice(index, 1);
      }

      dispatch({ type: 'UPDATE', payload: targetIssue });
      issueAPI.update({ id: issueId, label: { type, id } });
      return;
    }

    if (title === 'Milestone') {
      const milestoneId = type === 'add' ? id : null;

      if (type === 'add') {
        targetIssue.milestoneId = id;
      } else {
        targetIssue.milestoneId = null;
      }

      dispatch({ type: 'UPDATE', payload: targetIssue });
      issueAPI.update({ id: issueId, milestoneId });
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
