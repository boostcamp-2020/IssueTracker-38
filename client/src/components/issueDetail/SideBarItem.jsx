import React, { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';

import SideBarItemTitle from './SideBarItemTitle';
import SideBarItemDropdown from './SideBarItemDropdown';

import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../stores/IssueStore';
import { getItemById } from '../../utils/utils';
import { issueAPI } from '../../apis/api';


const styles = {
  layout: {
    width: '300px',
    border: '1px solid',
  },
  item: {
    width: 'max-content',
    padding: '5px',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
  selfAssignButton: {
    '&:hover': {
      color: 'blue',
    },
  },
  progress: {
    height: '10px',
    backgroundColor: '#4CAF50'
  },
  bar: {
    width: '100%',
    backgroundColor: ' #ddd'
  }
};

export default function SideBarItem({
  title, defaultMessage, dropdownItems, assigned, author
}) {
  const [isAction, toggleAction] = useState(false);
  const { issueId } = useParams();
  const { issues, dispatch } = useContext(IssuesContext);

  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  const assignMyself = (id) => async () => {
    const type = 'add';
    const targetIssue = { ...getItemById(issues, +issueId) };

    const { assignees } = targetIssue;
    assignees.push(id)

    const result = await issueAPI.update({ id: issueId, assignee: { type, id } });
    if (!result) return;

    dispatch({ type: 'UPDATE', payload: targetIssue });
  };

  const progressPercentage = (milestoneId) => {
    let closedCount = 0;
    const checkPoints = issues.filter((checkpoint) => checkpoint.milestoneId === +milestoneId);
    checkPoints.forEach(element => {
      if (element.isClosed === 1) closedCount = closedCount + 1
    });
    console.log(checkPoints)
    console.log(closedCount);
    return checkPoints.length ? (closedCount * 100) / checkPoints.length : 0
  }

  console.log(progressPercentage(2))
  return (
    <div css={styles.layout}>
      <SideBarItemTitle
        title={title}
        onClick={handleAssignButton}
      />
      {isAction && (
        <SideBarItemDropdown
          items={dropdownItems}
          assigned={assigned}
          title={title}
        />
      )}
      <div>
        {!assigned || assigned.length === 0 || Object.keys(assigned[0]).length === 0
          ? title === 'Assignees'
            ? <>{defaultMessage}<span css={styles.selfAssignButton} onClick={assignMyself(author.id)}>assign yourself</span> </> : defaultMessage
          : title === 'Milestone' ?
            assigned.map((element) => (
              <div css={{ ...styles.item, background: element.color }}>
                <div css={styles.bar}>
                  <div css={{ ...styles.progress, width: progressPercentage(element.id) + '%' }}></div>
                </div>{element.title}
              </div>
            ))
            : assigned.map((element) => (
              <div css={{ ...styles.item, background: element.color }}>
                {element.name || element.title || element.email}
              </div>
            ))}
      </div>
    </div>
  );
}




SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  author: PropTypes.node.isRequired
};
