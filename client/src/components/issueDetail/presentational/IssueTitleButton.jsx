import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  saveButton: {
    padding: '5px 16px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontSize: '15px',
    fontWeight: '600',
    '&:focus': {
      outline: 'none',
    },
    margin: 'auto 10px auto auto',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#0366d6',
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
};

export default function IssueTitleButton({ text, onClick }) {
  const targetStyle = text === 'save' ? styles.saveButton : styles.cancelButton;
  return (
    <button css={targetStyle} type="button" onClick={onClick}>
      {text}
    </button>
  );
}

IssueTitleButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
