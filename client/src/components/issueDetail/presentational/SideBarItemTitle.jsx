import React from 'react';
import { PropTypes } from 'prop-types';

import { settingIcon } from '../../../icons/icons';

const styles = {
  assignButton: {
    display: 'flex',
    marginBottom: '5px',
    justifyContent: 'space-between',
    cursor: 'pointer',
    color: '#586069',
    fill: '#959da5',
    '&:hover': {
      color: '#0366d6',
      fill: '#0366d6',
    },
  },
};

export default function SideBarItemTitle({ title, onClick }) {
  return (
    <div onClick={onClick} css={styles.assignButton}>
      <div>{title}</div>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path fillRule="evenodd" d={settingIcon} />
      </svg>
    </div>
  );
}

SideBarItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
