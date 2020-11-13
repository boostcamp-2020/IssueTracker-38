import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  button: {
    margin: '0 10px 10px auto',
    padding: '5px 16px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontSize: '15px',
    fontWeight: '600',
    '&:focus': {
      outline: 'none',
    },
  },
};

export default function DefaultButton({ text, onClick, extraStyle = {} }) {
  return (
    <>
      <button css={{ ...styles.button, ...extraStyle }} type="button" onClick={onClick}>
        {text}
      </button>
    </>
  );
}

DefaultButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  extraStyle: PropTypes.shape.isRequired,
};
