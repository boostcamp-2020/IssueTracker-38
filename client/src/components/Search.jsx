import React from 'react';

const styles = {
  inputWrapper: {
    padding: '5px',
    border: '1px solid lightgrey',
    borderRadius: '0 6px 6px 0',
    width: '90%',
    backgroundColor: '#efefef'
  },
  input: {
    backgroundColor: '#efefef',
    border: '0'
  }
};

export default function Search() {
  return (
    <div css={styles.inputWrapper}>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path
          fillRule="evenodd"
          d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
        />
      </svg>
      <input type="text" css={styles.input} placeholder="Search all issue" />
    </div>
  );
}
