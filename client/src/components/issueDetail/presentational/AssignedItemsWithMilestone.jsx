import { React } from 'react';
import { PropTypes } from 'prop-types';

const styles = {
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

export default function AssignedItemsWithMilestone({ assigned, progressPercentage }) {
  return (
    <div>
      {assigned.map((element) => (
        <div css={{ ...styles.item, width: '200px' }}>
          <div css={styles.bar}>
            <div css={{ ...styles.progress, width: `${progressPercentage(element.id)}%` }} />
          </div>
          {element.title}
        </div>
      ))}
    </div>
  );
}

AssignedItemsWithMilestone.propTypes = {
  progressPercentage: PropTypes.func.isRequired,
  assigned: PropTypes.arrayOf(PropTypes.node).isRequired,
};
