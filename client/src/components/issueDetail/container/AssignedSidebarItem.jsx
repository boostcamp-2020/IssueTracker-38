import { React, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { IssuesContext } from '../../../stores/IssueStore';

import AssignedItems from '../presentational/AssignedItems';
import AssignedItemsWithMilestone from '../presentational/AssignedItemsWithMilestone';

export default function AssignedSidebarItem({ title, assigned }) {
  const { issues } = useContext(IssuesContext);

  const progressPercentage = (milestoneId) => {
    const issuesWithMilestone = issues.filter((issue) => issue.milestoneId === +milestoneId);
    const closedCount = issuesWithMilestone.filter((e) => e.isClosed === 1).length;

    return (closedCount / issuesWithMilestone.length) * 100;
  };

  return (
    title === 'Milestone'
      ? <AssignedItemsWithMilestone assigned={assigned} progressPercentage={progressPercentage} />
      : <AssignedItems assigned={assigned} />);
}

AssignedSidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  assigned: PropTypes.arrayOf(PropTypes.node).isRequired,
};
