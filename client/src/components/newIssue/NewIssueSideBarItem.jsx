/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import NewIssueSideBarItemTitle from './NewIssueSideBarItemTitle';
import NewIssueSideBarItemDropdown from './NewIssueSideBarItemDropdown';
import MilestoneProgressBar from './MilestoneProgressBar';
import NewIssueSideBarAssignedDropdown from './NewIssueSideBarAssignedDropdown';

const styles = {
  layout: {
    width: '300px',
    border: '1px solid',
  },
  selfAssignButton: {
    '&:hover': {
      color: 'blue',
    },
  },
};

export default function NewIssueSideBarItem({
  title, defaultMessage, dropdownItems, assigned, setAssigned, author,
}) {
  const [isAction, toggleAction] = useState(false);

  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  const assignMyself = () => {
    const { id, name } = author;
    setAssigned([...assigned, { id, name }]);
  };

  const notAssignedMessage = title === 'Assignees'
    ? <button type="button" css={styles.selfAssignButton} onClick={assignMyself}>{defaultMessage}</button>
    : defaultMessage;

  const assignedDropdowns = title === 'Milestone'
    ? <MilestoneProgressBar assignedMilestone={assigned[0]} />
    : <NewIssueSideBarAssignedDropdown assigned={assigned} />;

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
          ? notAssignedMessage
          : assignedDropdowns}
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
