import React from 'react';

import { PropTypes } from 'prop-types';

const styles = {
  input: {
    margin: '10px',
    fontSize: '16px',
    background: '#f6f8fa',
    border: 'none',
    boxShadow: 'inset 0 0 2px 0px #bababa',
    height: '28px',
    padding: '0 5px',
    borderRadius: '4px',
    width: '400px',
  },
};

export default function NewIssueTitle({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      css={styles.input}
      type="text"
      placeholder="Title"
    />
  );
}

NewIssueTitle.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
