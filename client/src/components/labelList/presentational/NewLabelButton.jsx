import React from 'react';

import { PropTypes } from 'prop-types';

const style = {
  color: 'white',
  background: 'green',
  border: 'none',
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '5px',
};

export default function NewLabelButton({ title, onClick }) {
  return (
    <button onClick={onClick} css={style} type="button">
      {title}
    </button>
  );
}

NewLabelButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
