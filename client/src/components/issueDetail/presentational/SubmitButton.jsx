import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  button: {
    backgroundColor: '#2ea44f',
    color: 'white',
    padding: '5px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontSize: '15px',
    fontWeight: '600',
    '&:focus': {
      outline: 'none',
    },
  },
};

export default function SubmitButton({
  text, onClick, fontSize = '15px', isActive = true,
}) {
  return (
    <>
      <button css={{ ...styles.button, fontSize, backgroundColor: isActive ? '#2ea44f' : '#94d3a2' }} type="button" onClick={onClick}>
        {text}
      </button>
    </>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  fontSize: PropTypes.string.isRequired,
};
