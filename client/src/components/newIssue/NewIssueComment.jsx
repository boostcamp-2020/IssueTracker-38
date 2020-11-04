import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  inputTitle: {
    borderBottom: '1px solid #e1e4e8',
    width: '100%',
  },
  titleContent: {
    backgroundColor: 'white',
    width: '60px',
    margin: '10px 10px -1px 10px',
    padding: '5px 0',
    textAlign: 'center',
    border: '1px solid #e1e4e8',
    borderRadius: '6px 6px 0 0',
    borderBottom: '0',
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    boxShadow: '0px 0px 5px #e1e4e8',
    width: '100%',
    height: '200px',
    margin: '20px 10px 10px 10px',
    '&:focus': {
      backgroundColor: '#f6f8fa',
      outline: 'none',
    },
  },
};

export default function NewIssueComment({ value, onChange }) {
  return (
    <>
      <div css={styles.inputTitle}>
        <p css={styles.titleContent}>Write</p>
      </div>
      <div css={styles.inputWrapper}>
        <textarea value={value} onChange={onChange} css={styles.input} placeholder="Leave a Comment" />
      </div>
    </>
  );
}

NewIssueComment.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
