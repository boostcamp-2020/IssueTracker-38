import React from 'react';

import { useHistory } from 'react-router-dom';

const style = {
  button: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '5px 10px',
    boxSizing: 'border-box',
  },
};
export default function NewIssue() {
  const history = useHistory();

  const handleRedirection = () => {
    history.push('/new-issue');
  };

  return (
    <button onClick={handleRedirection} css={style.button} type="button">
      New Issue
    </button>
  );
}
