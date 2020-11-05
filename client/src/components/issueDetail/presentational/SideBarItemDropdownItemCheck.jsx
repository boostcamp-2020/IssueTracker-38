import React from 'react';

import { PropTypes } from 'prop-types';

import { checkMarkIcon } from '../../../icons/icons';

export default function SideBarItemDropdownItemCheck({ isAssigned }) {
  return (
    <div css={{ fill: isAssigned ? '#24292e' : 'white' }}>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path fillRule="evenodd" d={checkMarkIcon} />
      </svg>
    </div>
  );
}

SideBarItemDropdownItemCheck.propTypes = {
  isAssigned: PropTypes.bool.isRequired,
};
