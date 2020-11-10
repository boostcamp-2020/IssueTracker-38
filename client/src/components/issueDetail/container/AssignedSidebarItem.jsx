import { React, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { IssuesContext } from '../../../stores/IssueStore';

import AssignedItems from '../presentational/AssignedItems';
import AssignedItemsWithMilestone from '../presentational/AssignedItemsWithMilestone';

export default function AssignedSidebarItem({ title, assigned }) {
  const { issues } = useContext(IssuesContext);

  const progressPercentage = (milestoneId) => {
    let closedCount = 0;
    const checkPoints = issues.filter((checkpoint) => checkpoint.milestoneId === +milestoneId);
    checkPoints.forEach((element) => {
      if (element.isClosed === 1) closedCount += 1;
    });
    return checkPoints.length ? (closedCount * 100) / checkPoints.length : 0;
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
