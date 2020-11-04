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
  self: {
    '&:hover': {
      color: 'blue',
    },
  },
};

export default function NewIssueSideBarItem({
  title, dropdownItems, assigned, setAssigned, author,
}) {
  const [isAction, toggleAction] = useState(false);

  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  const assignMyself = () => {
    const { id, name } = author;
    setAssigned([...assigned, { id, name }]);
  };

  const defaultMessageMap = {
    Assignees: <button type="button" css={styles.self} onClick={assignMyself}>No one - assign yourself</button>,
    Labels: 'None yet',
    Milestone: 'No Milestone',
  };

  const assignedDropdownMap = {
    Assignees: <NewIssueSideBarAssignedDropdown assigned={assigned} />,
    Labels: <NewIssueSideBarAssignedDropdown assigned={assigned} />,
    Milestone: <MilestoneProgressBar assignedMilestone={assigned[0]} />,
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
          ? defaultMessageMap[title]
          : assignedDropdownMap[title]}
      </div>
    </div>
  );
}

NewIssueSideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssigned: PropTypes.func.isRequired,
  author: PropTypes.objectOf(PropTypes.node).isRequired,
};
