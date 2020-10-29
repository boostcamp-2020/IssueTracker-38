import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import Issue from './Issue';

const style = {
  layout: {
    display: 'flex',
    width: '100%',
    border: '1px solid lightgrey',
    padding: '10px 15px',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: '#efefef'
    }
  },
  statusIcon: {
    marginTop: '3px',
    marginLeft: '10px',
    fill: 'green'
  }
};
export default function Issues({ issues, handleCheckboxClick, selections }) {
  return (
    <>
      {issues.map(
        ({ title, milestone, label, issueId, createdAt, asignee }) => (
          <div css={style.layout} key={issueId}>
            <input
              onClick={() => handleCheckboxClick(issueId)}
              checked={selections.includes(issueId)}
              type="checkbox"
            />
            <svg
              css={style.statusIcon}
              class="octicon octicon-issue-opened open"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
              ></path>
            </svg>
            <Issue
              title={title}
              milestone={milestone}
              label={label}
              issueId={issueId}
              createdAt={createdAt}
              asignee={asignee}
            />
          </div>
        )
      )}
    </>
  );
}

Issues.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired
};
