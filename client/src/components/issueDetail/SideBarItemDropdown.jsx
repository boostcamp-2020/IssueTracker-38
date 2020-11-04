import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../stores/IssueStore';

import { getItemById } from '../../utils/utils';

import { issueAPI } from '../../apis/api';
import { checkMarkIcon } from '../../icons/icons';

const styles = {
  layout: {
    position: 'absolute',
    width: '300px',
    marginLeft: '-10px',
    border: '1px solid #eff1f3',
    background: 'white',
    boxShadow: '0px 0px 20px 5px #d2d2d2',
  },
  item: {
    marginLeft: '10px',
    border: 'none',
    background: 'white',
  },
  itemWrapper: {
    display: 'flex',
    padding: '10px',
    borderBottom: '1px solid #eff1f3',
  },
  haedMessage: {
    padding: '10px',
    backgroundColor: '#f7f8fa',
    borderBottom: '1px solid #eff1f3',
  },
  colorSample: {
    width: '12px',
    height: '12px',
    marginRight: '5px',
  },
};

export default function SideBarItemDropdown({
  items, assigned, title, dropdownRef,
}) {
  const { issueId } = useParams();
  const { issues, dispatch } = useContext(IssuesContext);

  const isAlreadyAssigned = (id) => getItemById(assigned, id);

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
      const result = await issueAPI.update({ id: issueId, assignee: { type, id } });
      if (!result) return;
    }

    if (title === 'Labels') {
      const { labels } = targetIssue;
      const actions = {
        add: () => labels.push(id),
        delete: () => labels.splice(labels.indexOf(id), 1),
      };

      actions[type]();
      const result = await issueAPI.update({ id: issueId, label: { type, id } });
      if (!result) return;
    }

    if (title === 'Milestone') {
      let milestoneId = null;

      const actions = {
        add: () => { targetIssue.milestoneId = id; milestoneId = id; },
        delete: () => { targetIssue.milestoneId = null; },
      };

      actions[type]();
      const result = await issueAPI.update({ id: issueId, milestoneId });
      if (!result) return;
    }

    dispatch({ type: 'UPDATE', payload: targetIssue });
  };

  const getHeadMessage = () => {
    if (title === 'Assignees') return 'Assign up to 10 people to this issue';
    if (title === 'Labels') return 'Apply labels to this issue';
    return 'Set milestone';
  };

  return (
    <div css={styles.layout} ref={dropdownRef}>
      <div css={styles.haedMessage}>
        {getHeadMessage()}
      </div>
      {items.map(({ id, itemName, color }) => (
        <div css={styles.itemWrapper}>
          <div css={{ fill: isAlreadyAssigned(id) ? '#24292e' : 'white' }}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d={checkMarkIcon} />
            </svg>
          </div>
          <button
            onClick={handleAssigning(id)}
            css={{ ...styles.item, display: 'flex' }}
            type="button"
            key={id}
          >
            {title === 'Labels' ? <div css={{ ...styles.colorSample, backgroundColor: color }} /> : <></>}
            <div>{itemName}</div>
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
  dropdownRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]).isRequired,
};
