import React, { useContext } from 'react';

import { PropTypes } from 'prop-types';

import { UsersContext } from '../../stores/UserStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';

import { getNicknameByEmail } from '../../utils/utils';

import NewIssueSideBarItem from './NewIssueSideBarItem';

export default function NewIssueSideBar({
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

  const temptAuthor = { id: 9999, name: 'tester' };

  return (
    <div>
      <NewIssueSideBarItem
        title="Assignees"
        defaultMessage="No one--"
        dropdownItems={users.map((user) => ({ ...user, itemName: getNicknameByEmail(user.email) }))}
        assigned={assignedUsers}
        setAssigned={setAssignedUsers}
        author={temptAuthor}
      />
      <NewIssueSideBarItem
        title="Labels"
        defaultMessage="None yet"
        dropdownItems={labels.map((label) => ({ ...label, itemName: label.name }))}
        assigned={assignedLabels}
        setAssigned={setAssignedLabels}
        author={temptAuthor}
      />
      <NewIssueSideBarItem
        title="Milestone"
        defaultMessage="No milestone"
        dropdownItems={milestones.map((milestone) => ({ ...milestone, itemName: milestone.title }))}
        assigned={assignedMilestone}
        setAssigned={setAssignedMilestone}
        author={temptAuthor}
      />
    </div>
  );
}

NewIssueSideBar.propTypes = {
  assignedUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssignedUsers: PropTypes.func.isRequired,
  assignedLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssignedLabels: PropTypes.func.isRequired,
  assignedMilestone: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssignedMilestone: PropTypes.func.isRequired,
};
