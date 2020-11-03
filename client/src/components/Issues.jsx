import React from 'react';
import { PropTypes } from 'prop-types';

import Issue from './Issue';

const styles = {
  layout: {
    display: 'flex',
    width: '100%',
    border: '1px solid lightgrey',
    padding: '10px 15px',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  statusIcon: {
    marginTop: '3px',
    marginLeft: '10px',
    fill: 'green',
  },
};
export default function Issues({ issues, handleCheckboxClick, selections }) {
  return (
    <>
      {issues.map(
        ({
          title, milestoneId, labels, id, createdAt, userId,
        }) => (
          <div css={styles.layout} key={id}>
            <input
              onChange={() => handleCheckboxClick(id)}
              checked={selections.includes(id)}
              type="checkbox"
            />
            <svg
              css={styles.statusIcon}
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
              />
            </svg>
            <Issue
              title={title}
              milestoneId={milestoneId}
              labels={labels}
              id={id}
              createdAt={createdAt}
              userId={userId}
            />
          </div>
        ),
      )}
    </>
  );
}

Issues.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  selections: PropTypes.arrayOf(PropTypes.number).isRequired,
};
