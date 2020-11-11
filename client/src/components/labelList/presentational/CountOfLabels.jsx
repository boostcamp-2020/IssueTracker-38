import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  count: {
    padding: '15px',
    borderBottom: '1px solid lightgray',
    backgroundColor: '#efefef',
    fontWeight: '600',
  },
};

export default function CountOfLabels({ count }) {
  return (
    <div css={styles.count}>
      {count}
      {' '}
      labels
    </div>
  );
}

CountOfLabels.propTypes = {
  count: PropTypes.number.isRequired,
};
