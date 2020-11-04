/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';

import { IssuesContext } from '../../stores/IssueStore';

import NewIssueSideBarItemTitle from './NewIssueSideBarItemTitle';
import NewIssueSideBarItemDropdown from './NewIssueSideBarItemDropdown';

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
  myProgress: {
    height: '10px',
    backgroundColor: '#4CAF50',
  },
  myBar: {
    width: '100%',
    backgroundColor: '#ddd',
  },
};

export default function NewIssueSideBarItem({
  title, defaultMessage, dropdownItems, assigned, setAssigned, author,
}) {
  const { issues } = useContext(IssuesContext);
  const [isAction, toggleAction] = useState(false);

  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  const progressPercentage = (milestoneId) => {
    let closedCount = 0;
    const checkPoints = issues.filter((checkpoint) => checkpoint.milestoneId === +milestoneId);
    checkPoints.forEach((element) => {
      if (element.isClosed === 1) closedCount += 1;
    });
    return checkPoints.length ? (closedCount * 100) / checkPoints.length : 0;
  };

  const assignMyself = () => {
    const { id, name } = author;
    setAssigned([...assigned, { id, name }]);
  };

  return (
    <div css={styles.layout}>
      <NewIssueSideBarItemTitle
        title={title}
        onClick={handleAssignButton}
      />
      {isAction && (
      <NewIssueSideBarItemDropdown
        items={dropdownItems}
        assigned={assigned}
        setAssigned={setAssigned}
        title={title}
      />
      )}
      <div>
        {assigned.length === 0
          ? title === 'Assignees'
            ? (
              <>
                {defaultMessage}
                <button type="button" css={styles.selfAssignButton} onClick={assignMyself}>assign yourself</button>
                {' '}
              </>
            )
            : defaultMessage
          : title === 'Milestone'
            ? assigned.map((element) => (
              <div css={styles.item}>
                <div css={styles.myBar}>
                  <div css={{ ...styles.myProgress, width: `${progressPercentage(element.id)}%` }} />
                </div>
                {element.name}
              </div>
            ))
            : assigned.map(({ name, color }) => (
              <div css={{ ...styles.item, background: color }}>
                {name}
              </div>
            ))}
      </div>
    </div>
  );
}

NewIssueSideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssigned: PropTypes.func.isRequired,
  author: PropTypes.objectOf(PropTypes.node).isRequired,
};
