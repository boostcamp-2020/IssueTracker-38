import React from 'react';
import { PropTypes } from 'prop-types';
import { openedIcon, closedIcon } from '../../../icons/icons';

const styles = {
  statusIcon: {
    display: 'flex',
    color: 'white',
    borderRadius: '6px',
    padding: '2px 10px',
  },
  statusSvg: {
    margin: 'auto 5px auto 0',
  },
  statusContext: {
    marginBottom: '3px',
  },
};

export default function IssueState({ isClosed }) {
  return (
    <div css={{ ...styles.statusIcon, backgroundColor: isClosed ? '#d73a49' : '#28a745' }}>
      <svg
        css={styles.statusSvg}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="white"
      >
        <path
          fillRule="evenodd"
          d={isClosed ? closedIcon : openedIcon}
        />
      </svg>
      <p css={styles.statusContext}>{isClosed ? 'Close' : 'Open'}</p>
    </div>
  );
}

IssueState.propTypes = {
  isClosed: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
};
