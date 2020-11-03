import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  body: {
  },
  profile: {
  },
  layout: {
  },
  inputWrapper: {
  },
  statusButton: {
  },
  commentButton: {
  },
};

export default function NewComment({ user, issue }) {
  const changeIssueStatus = () => {
  };

  const submitComment = () => {
  };

  return (
    <div css={styles.body}>
      <div css={styles.profile} />
      <div css={styles.layout}>
        <div css={styles.inputWrapper}>
          <input type="text" />
          <button css={styles.statusButton} type="submit" onClick={changeIssueStatus}>
            {issue?.isClosed ? 'Reopen issue' : 'Close issue'}
          </button>
          <button css={styles.commentButton} type="submit" onClick={submitComment}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

NewComment.propTypes = {
  user: PropTypes.shape.isRequired,
  issue: PropTypes.shape.isRequired,
};
