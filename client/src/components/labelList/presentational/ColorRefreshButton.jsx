import React from 'react';

import { colorRefreshIcon } from '../../../icons/icons';

const style = {
  padding: '8px 8px 5px 8px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
};

export default function ColorRefreshButton({ backgroundColor }) {
  return (
    <button type="button" css={{ ...style, backgroundColor }} aria-label="colorChange">
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path fillRule="evenodd" d={colorRefreshIcon} />
      </svg>
    </button>
  );
}
