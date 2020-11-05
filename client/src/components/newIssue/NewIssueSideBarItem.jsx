import React from 'react';

import { PropTypes } from 'prop-types';

import { useSwitch } from '../../hooks/hooks';

import NewIssueSideBarItemTitle from './NewIssueSideBarItemTitle';
import NewIssueSideBarItemDropdown from './NewIssueSideBarItemDropdown';
import MilestoneProgressBar from './MilestoneProgressBar';
import NewIssueSideBarAssignedDropdown from './NewIssueSideBarAssignedDropdown';

const styles = {
  layout: {
    width: '300px',
    borderBottom: '1px solid #eaecef',
    padding: '10px 0',
  },
  self: {
    '&:hover': {
      color: 'blue',
    },
  },
  defaultMessage: {
    color: '#586069',
    fontWeight: '100',
  },
};

export default function NewIssueSideBarItem({
  title, dropdownItems, assigned, setAssigned, author,
}) {
  const [isDropdownOn, switchDropdownState] = useSwitch(false);

  const assignMyself = () => {
    const { id, name } = author;
    setAssigned([...assigned, { id, name }]);
  };

  const defaultMessageMap = {
    Assignees: <div css={styles.defaultMessage}><span css={styles.self} onClick={assignMyself}>No one - assign yourself</span></div>,
    Labels: <div css={styles.defaultMessage}>None yet</div>,
    Milestone: <div css={styles.defaultMessage}>No Milestone</div>,
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
        onClick={switchDropdownState}
      />
      {isDropdownOn && (
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
