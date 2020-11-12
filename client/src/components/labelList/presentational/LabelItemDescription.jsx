import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  description: {
    position: 'absolute',
    top: '15px',
    left: '400px',
  },
};

export default function LabelItemDescription({ description }) {
  return (
    <div css={styles.description}>
      {description || 'No description' }
    </div>
  );
}

LabelItemDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
