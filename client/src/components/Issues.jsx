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
          title, milestoneId, labels, id, createdAt, userId, isClosed,
        }) => (
          <div css={styles.layout} key={id}>
            <input
              css={styles.checkbox}
              onChange={() => handleCheckboxClick(id)}
              checked={selections.includes(id)}
              type="checkbox"
            />
            <Issue
              title={title}
              milestoneId={milestoneId}
              labels={labels}
              id={id}
              createdAt={createdAt}
              userId={userId}
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
