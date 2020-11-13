import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { UsersContext } from '../../../stores/UserStore';
import { IssuesContext } from '../../../stores/IssueStore';
import { LabelsContext } from '../../../stores/LabelStore';
import { MilestoneContext } from '../../../stores/MilestoneStore';

import { getItemById } from '../../../utils/utils';

import SideBarItem from './SideBarItem';
import SideBarWrapper from '../layouts/SideBarWrapper';

export default function SideBar() {
  const { issueId } = useParams();

  const { issues } = useContext(IssuesContext);
  const { labels } = useContext(LabelsContext);
  const { users } = useContext(UsersContext);
  const { milestones } = useContext(MilestoneContext);

  if (!issues[0] || !labels[0] || !users[0] || !milestones[0]) {
    return <div />;
  }

  const targetIssue = getItemById(issues, +issueId);

  const author = JSON.parse(localStorage.getItem('userInfo'));
  const assignedUsers = targetIssue.assignees.map((assigneeId) => {
    const { id, nickname } = getItemById(users, assigneeId);
    return { id, nickname };
  });
  const assignedLabels = targetIssue.labels.map((id) => getItemById(labels, id));
  const assignedMilestone = [getItemById(milestones, targetIssue.milestoneId)];
  if (!assignedMilestone[0]) assignedMilestone.pop();

  return (
    <SideBarWrapper>
      <SideBarItem
        title="Assignees"
        defaultMessage="No one - "
        dropdownItems={users.map(({ id, nickname }) => ({ id, itemName: nickname }))}
        assigned={assignedUsers}
        author={author}
      />
      <SideBarItem
        title="Labels"
        defaultMessage="None yet"
        dropdownItems={labels.map(({ id, name, color }) => ({ id, itemName: name, color }))}
        assigned={assignedLabels}
        author={author}
      />
      <SideBarItem
        title="Milestone"
        defaultMessage="No milestone"
        dropdownItems={milestones.map(({ id, title }) => ({ id, itemName: title }))}
        assigned={assignedMilestone}
        author={author}
      />
    </SideBarWrapper>
  );
}
