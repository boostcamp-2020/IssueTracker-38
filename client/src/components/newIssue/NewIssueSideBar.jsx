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

  return (
    <div>
      <NewIssueSideBarItem
        title="Assignees"
        defaultMessage="No one--assign yourself"
        dropdownItems={users.map(({ id, email }) => ({ id, itemName: getNicknameByEmail(email) }))}
        assigned={assignedUsers}
        setAssigned={setAssignedUsers}
      />
      <NewIssueSideBarItem
        title="Labels"
        defaultMessage="None yet"
        dropdownItems={labels.map(({ id, name }) => ({ id, itemName: name }))}
        assigned={assignedLabels}
        setAssigned={setAssignedLabels}
      />
      <NewIssueSideBarItem
        title="Milestone"
        defaultMessage="No milestone"
        dropdownItems={milestones.map(({ id, title }) => ({ id, itemName: title }))}
        assigned={assignedMilestone}
        setAssigned={setAssignedMilestone}
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
