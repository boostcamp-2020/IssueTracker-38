import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { UsersContext } from '../../stores/UserStore';
import { IssuesContext } from '../../stores/IssueStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';

import { getNicknameByEmail, getItemById } from '../../utils/utils';

import SideBarItem from './SideBarItem';

export default function SideBar() {
  const { issueId } = useParams();

  const { issues } = useContext(IssuesContext);
  const { labels } = useContext(LabelsContext);
  const { users } = useContext(UsersContext);
  const { milestones } = useContext(MilestoneContext);

  if (!issues[0] || !labels[0] || !users[0] || !milestones[0]) {
    return <div />;
  }

  const targetIssue = issues.find((issue) => issue.id === +issueId);

  const assignedUsers = targetIssue.assignees.map((assigneeId) => {
    const { id, email } = getItemById(users, assigneeId);
    return { id, email, name: getNicknameByEmail(email) };
  });
  const assignedLabels = targetIssue.labels.map((id) => getItemById(labels, id));
  const assignedMilestone = getItemById(milestones, targetIssue.milestoneId);

  return (
    <>
      <SideBarItem
        title="Assignees"
        defaultMessage="No one--assign yourself"
        dropdownItems={users.map(({ id, email }) => ({ id, itemName: getNicknameByEmail(email) }))}
        assigned={assignedUsers}
      />
      <SideBarItem
        title="Labels"
        defaultMessage="None yet"
        dropdownItems={labels.map(({ id, name }) => ({ id, itemName: name }))}
        assigned={assignedLabels}
      />
      <SideBarItem
        title="Milestone"
        defaultMessage="No milestone"
        dropdownItems={milestones.map(({ id, title }) => ({ id, itemName: title }))}
        assigned={[assignedMilestone]}
      />
    </>
  );
}
