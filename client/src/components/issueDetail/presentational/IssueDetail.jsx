import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  issueDetail: {
    margin: 'auto 0 auto 10px',
  },
};

export default function IssueDetail({ author, elapsedTime, countOfComments }) {
  return (
    <div css={styles.issueDetail}>
      {author}
      {' '}
      opened this issue
      {' '}
      {elapsedTime}
      {' '}
      ago
      {' · '}
      {countOfComments}
      {' '}
      comments
    </div>
  );
}

IssueDetail.propTypes = {
  author: PropTypes.string.isRequired,
  elapsedTime: PropTypes.string.isRequired,
  countOfComments: PropTypes.number.isRequired,
};
