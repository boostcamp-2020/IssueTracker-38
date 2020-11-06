import { React, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { IssuesContext } from '../../../stores/IssueStore';

const styles = {
  defaultMessage: {
    color: '#586069',
    fontWeight: '100',
  },
  selfAssignButton: {
    '&:hover': {
      color: 'blue',
    },
  },
  progress: {
    height: '10px',
    backgroundColor: '#4CAF50',
  },
  bar: {
    width: '100%',
    backgroundColor: '#ddd',
  },
  item: {
    width: 'max-content',
    padding: '2px 10px',
    margin: '5px 5px 0 0',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
};

export default function AssignedSidebarItem({
  title, assigned,
}) {
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
      ? assigned.map((element) => (
        <div css={{ ...styles.item, width: '200px' }}>
          <div css={styles.bar}>
            <div css={{ ...styles.progress, width: `${progressPercentage(element.id)}%` }} />
          </div>
          {element.title}
        </div>
      ))
      : assigned.map((element) => (
        <div css={{ ...styles.item, background: element.color, display: element.name ? 'inline-block' : 'block' }}>
          {element.name || element.title || element.email}
        </div>
      ))
  );
}

AssignedSidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  assigned: PropTypes.arrayOf(PropTypes.node).isRequired,
};
