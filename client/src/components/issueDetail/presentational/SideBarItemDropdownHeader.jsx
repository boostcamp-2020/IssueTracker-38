import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  haedMessage: {
    padding: '10px',
    backgroundColor: '#f7f8fa',
    borderBottom: '1px solid #eff1f3',
  },
};

export default function SideBarItemDropdownHeader({ type }) {
  const headMessageMap = {
    Assignees: 'Assign up to 10 people to this issue',
    Labels: 'Apply labels to this issue',
    Milestone: 'Set milestone',
  };

  return (
    <div css={styles.haedMessage}>
      {headMessageMap[type]}
    </div>
  );
}

SideBarItemDropdownHeader.propTypes = {
  type: PropTypes.string.isRequired,
};
