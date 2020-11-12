import React from 'react';
import { PropTypes } from 'prop-types';

import { decideTextColor } from '../../../utils/utils';

const styles = {
  name: {
    padding: '2px 10px',
    backgroundColor: 'violet',
    fontWeight: 'bolder',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
};

export default function LabelItemName({ name, color }) {
  return (
    <div css={{ ...styles.name, backgroundColor: color, color: decideTextColor(color) }}>
      {name}
    </div>
  );
}

LabelItemName.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
