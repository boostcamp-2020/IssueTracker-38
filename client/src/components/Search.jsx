import React from 'react';

export default function search() {
  const styles = {
    inputWrapper: {
      padding: '5px',
      border: '1px solid black',
    },
    input: {
      border: '0',
    },
  };
  return (
    <div css={styles.inputWrapper}>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path fillRule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z" />
      </svg>
      <input type="text" css={styles.input} placeholder="Search all issue" />
    </div>
  );
}
