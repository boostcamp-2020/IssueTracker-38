import React from 'react';
import { PropTypes } from 'prop-types';

import { settingIcon } from '../../icons/icons';

const styles = {
  assignButton: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
      fill: 'blue',
    },
  },
};

export default function SideBarItemTitle({ title, onClick }) {
  return (
    <div onClick={onClick} css={styles.assignButton}>
      <div>{title}</div>
      <svg viewBox="0 0 16 16" width="20" height="20">
        <path fillRule="evenodd" d={settingIcon} />
      </svg>
    </div>
  );
}

SideBarItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
