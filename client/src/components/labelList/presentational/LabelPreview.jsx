import React from 'react';

import { PropTypes } from 'prop-types';

import { decideTextColor } from '../../../utils/utils';

const style = {
  padding: '5px 10px',
  backgroundColor: '#1194',
  fontWeight: 'bold',
  width: 'max-content',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  marginBottom: '24px',
};

export default function LabelPreview({ name, color }) {
  return (
    <div css={{ ...style, backgroundColor: color }}>
      <span css={{ color: decideTextColor(color) }}>{name}</span>
    </div>
  );
}

LabelPreview.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
