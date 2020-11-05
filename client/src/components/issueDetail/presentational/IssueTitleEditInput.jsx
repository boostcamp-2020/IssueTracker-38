import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  titleEdit: {
    width: '85%',
    fontSize: '16px',
    padding: '5px 10px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    '&:focus': {
      boxShadow: '0px 0px 5px #0366d6',
      outline: 'none',
    },
  },
};

export default function IssueTitleEditInput({ titleState, setTitle }) {
  return (
    <input css={styles.titleEdit} type="text" value={titleState} onChange={(e) => setTitle(e.target.value)} />
  );
}

IssueTitleEditInput.propTypes = {
  titleState: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};
