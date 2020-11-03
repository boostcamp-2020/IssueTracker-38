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
      const { assignees } = targetIssue;
      const actions = {
        add: () => assignees.push(id),
        delete: () => assignees.splice(assignees.indexOf(id), 1),
      };

      actions[type]();
      dispatch({ type: 'UPDATE', payload: targetIssue });
      issueAPI.update({ id: issueId, assignee: { type, id } });
    }

    if (title === 'Labels') {
      const { labels } = targetIssue;
      const actions = {
        add: () => labels.push(id),
        delete: () => labels.splice(labels.indexOf(id), 1),
      };

      actions[type]();
      dispatch({ type: 'UPDATE', payload: targetIssue });
      issueAPI.update({ id: issueId, label: { type, id } });
    }

    if (title === 'Milestone') {
      let milestoneId = null;

      const actions = {
        add: () => { targetIssue.milestoneId = id; milestoneId = id; },
        delete: () => { targetIssue.milestoneId = null; },
      };

      actions[type]();
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
