import React from 'react';

const style = {
  button: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '5px 10px',
    boxSizing: 'border-box'
  }
};
export default function NewIssue() {
  return (
    <button css={style.button} type="button">
      New Issue
    </button>
  );
}
