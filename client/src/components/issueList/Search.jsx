import React from 'react';

import { searchIcon } from '../../icons/icons';

const styles = {
  inputWrapper: {
    padding: '5px',
    border: '1px solid lightgrey',
    borderRadius: '0 6px 6px 0',
    width: '90%',
    backgroundColor: '#efefef',
    display: 'flex',
  },
  input: {
    backgroundColor: '#efefef',
    border: '0',
    margin: 'auto 0',
    fontSize: '15px',
  },
  searchIcon: {
    margin: 'auto 2px',
  },
};

export default function Search() {
  return (
    <div css={styles.inputWrapper}>
      <svg viewBox="0 0 16 16" width="16" height="16" css={styles.searchIcon}>
        <path
          fillRule="evenodd"
          d={searchIcon}
        />
      </svg>
      <input type="text" css={styles.input} placeholder="Search all issue" />
    </div>
  );
}
