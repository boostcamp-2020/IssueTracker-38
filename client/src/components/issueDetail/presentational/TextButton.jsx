import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  button: {
    margin: 'auto 0 auto 10px',
    color: '#6a737d',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '15px',
    '&:focus': {
      outline: 'none',
    },
  },
};

export default function TextButton({ text, onClick, extraStyle = {} }) {
  return (
    <>
      <button css={{ ...styles.button, ...extraStyle }} type="button" onClick={onClick}>
        {text}
      </button>
    </>
  );
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  extraStyle: PropTypes.shape.isRequired,
};
