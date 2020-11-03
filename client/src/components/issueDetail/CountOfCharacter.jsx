import React from 'react';
import { PropTypes } from 'prop-types';

export default function CountOfCharacter({ displayState, count }) {
  return (
    <>
      {displayState ? (
        <div>
          {count}
          {' '}
          characters
        </div>
      ) : (<></>)}
    </>
  );
}

CountOfCharacter.propTypes = {
  displayState: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
};
