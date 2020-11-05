import React from 'react';

import { PropTypes } from 'prop-types';

const styles = {
  layout: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentButton: {
    fontSize: '16px',
    color: 'white',
    padding: '10px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
  cancelButton: {
    fontSize: '16px',
    backgroundColor: 'white',
    padding: '10px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
  },
};

export default function NewIssueButton({ inputContent, onSubmit, onCancel }) {
  const buttonColor = {
    backgroundColor: inputContent ? '#2ea44f' : '#94d3a2',
  };

  return (
    <div css={styles.layout}>
      <button onClick={onCancel} css={styles.cancelButton} type="button">
        Cancel
      </button>
      <button onClick={onSubmit} css={{ ...styles.commentButton, ...buttonColor }} type="button">
        Submit new issue
      </button>
    </div>
  );
}

NewIssueButton.propTypes = {
  inputContent: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
