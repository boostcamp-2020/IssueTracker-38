import { React, useContext } from 'react';
import { PropTypes } from 'prop-types';

import { IssuesContext } from '../../../stores/IssueStore';

const styles = {
  item: {
    width: 'max-content',
    padding: '2px 10px',
    margin: '5px 5px 0 0',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
  progress: {
    height: '10px',
    backgroundColor: '#4CAF50',
  },
  bar: {
    width: '100%',
    backgroundColor: ' #ddd',
  },
};

const { issues } = useContext(IssuesContext);

const progressPercentage = (milestoneId) => {
  let closedCount = 0;
  const checkPoints = issues.filter((checkpoint) => checkpoint.milestoneId === +milestoneId);
  checkPoints.forEach((element) => {
    if (element.isClosed === 1) closedCount += 1;
  });

  return checkPoints.length ? (closedCount * 100) / checkPoints.length : 0;
};

export default function MilestoneSidebarItem({
  element,
}) {
  return (
    <div css={styles.item}>
      <div css={styles.bar}>
        <div css={{ ...styles.progress, width: `${progressPercentage(element.id)}%` }} />
      </div>
      {element.title}
    </div>
  );
}

MilestoneSidebarItem.propTypes = {
  element: PropTypes.shape.isRequired,
};
