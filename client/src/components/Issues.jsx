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
  checkbox: {
    marginTop: '3px',
  },
};
export default function Issues({ issues, handleCheckboxClick, selections }) {
  return (
    <>
      {issues.map(
        ({
          title, milestone, label, issueId, createdAt, asignee, isClosed,
        }) => (
          <div css={styles.layout} key={issueId}>
            <input
              css={styles.checkbox}
              onChange={() => handleCheckboxClick(issueId)}
              checked={selections.includes(issueId)}
              type="checkbox"
            />
            <Issue
              title={title}
              milestone={milestone}
              label={label}
              issueId={issueId}
              createdAt={createdAt}
              asignee={asignee}
              isClosed={isClosed}
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
