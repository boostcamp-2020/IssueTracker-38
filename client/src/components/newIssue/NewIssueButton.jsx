import React from 'react';

import { PropTypes } from 'prop-types';

const styles = {
  commentButton: {
    color: 'white',
    padding: '5px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: '5px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
};

export default function NewIssueButton({ inputContent, onSubmit, onCancel }) {
  const buttonColor = {
    backgroundColor: inputContent ? '#2ea44f' : '#94d3a2',
  };

  return (
    <>
      <button onClick={onCancel} css={styles.cancelButton} type="button">
        Cancel
      </button>
      <button onClick={onSubmit} css={{ ...styles.commentButton, ...buttonColor }} type="button">
        Comment
      </button>
    </>
  );
}

NewIssueButton.propTypes = {
  inputContent: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
