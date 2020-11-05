import React, { useContext } from 'react';

import { PropTypes } from 'prop-types';

import { UsersContext } from '../../stores/UserStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';

import { getNicknameByEmail } from '../../utils/utils';

import NewIssueSideBarItem from './NewIssueSideBarItem';

const styles = {
  wrapper: {
    margin: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
};

export default function NewIssueSideBar({
  currentUser,
  assignedUsers,
  setAssignedUsers,
  assignedLabels,
  setAssignedLabels,
  assignedMilestone,
  setAssignedMilestone,
}) {
  const { labels } = useContext(LabelsContext);
  const { users } = useContext(UsersContext);
  const { milestones } = useContext(MilestoneContext);

  if (!labels[0] || !users[0] || !milestones[0]) {
    return <div />;
  }

  const author = { ...currentUser, name: getNicknameByEmail(currentUser.email) };

  return (
    <div css={styles.wrapper}>
      <NewIssueSideBarItem
        title="Assignees"
        dropdownItems={users.map((user) => ({ ...user, itemName: getNicknameByEmail(user.email) }))}
        assigned={assignedUsers}
        setAssigned={setAssignedUsers}
        author={author}
      />
      <NewIssueSideBarItem
        title="Labels"
        dropdownItems={labels.map((label) => ({ ...label, itemName: label.name }))}
        assigned={assignedLabels}
        setAssigned={setAssignedLabels}
        author={author}
      />
      <NewIssueSideBarItem
        title="Milestone"
        dropdownItems={milestones.map((milestone) => ({ ...milestone, itemName: milestone.title }))}
        assigned={assignedMilestone}
        setAssigned={setAssignedMilestone}
        author={author}
      />
    </div>
  );
}

NewIssueSideBar.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.node).isRequired,
  assignedUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssignedUsers: PropTypes.func.isRequired,
  assignedLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssignedLabels: PropTypes.func.isRequired,
  assignedMilestone: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssignedMilestone: PropTypes.func.isRequired,
};
