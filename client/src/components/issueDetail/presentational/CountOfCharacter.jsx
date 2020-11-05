import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  desctiption: {
    position: 'absolute',
    fontSize: '12px',
    color: '#6a737d',
    right: '30px',
    bottom: '60px',
  },
};

export default function CountOfCharacter({ displayState, count }) {
  return (
    <>
      {displayState ? (
        <div css={styles.desctiption}>
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
