import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  count: {
    backgroundColor: 'lightgrey',
    padding: '3px 10px',
    fontSize: '13px',
    borderRadius: '15px',
  },
};
export default function GroupButton({
  countOfGroup,
  svgPathD,
  title,
  emotion,
}) {
  return (
    <div css={emotion}>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path fillRule="evenodd" d={svgPathD} />
      </svg>
      <span>
        {' '}
        {title}
        {' '}
      </span>
      <span css={styles.count}>{countOfGroup}</span>
    </div>
  );
}

GroupButton.propTypes = {
  countOfGroup: PropTypes.number.isRequired,
  svgPathD: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  emotion: PropTypes.objectOf(PropTypes.node).isRequired,
};
