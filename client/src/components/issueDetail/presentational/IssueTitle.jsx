import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  titleContext: {
    color: '#2f363d',
    fontSize: '30px',
  },
  issueNumber: {
    fontSize: '30px',
    color: '#6a737d',
  },
};

export default function IssueTitle({ title, issueId }) {
  return (
    <>
      <div css={styles.titleContext}>{title}</div>
      <div css={styles.issueNumber}>
        #
        {issueId}
      </div>
    </>
  );
}

IssueTitle.propTypes = {
  title: PropTypes.string.isRequired,
  issueId: PropTypes.number.isRequired,
};
