import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  position: 'absolute',
  fontSize: '12px',
  color: '#6a737d',
  right: '25px',
  bottom: '60px',
};
export default function CountOfCharacter({ displayState, count }) {
  return (
    <>
      {displayState ? (
        <div css={styles}>
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
