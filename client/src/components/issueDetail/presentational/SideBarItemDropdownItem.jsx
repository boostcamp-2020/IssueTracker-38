import React from 'react';

import { PropTypes } from 'prop-types';

import SideBarItemDropdownItemCheck from './SideBarItemDropdownItemCheck';
import SideBarItemDropdownItemName from './SideBarItemDropdownItemName';

const styles = {
  itemWrapper: {
    display: 'flex',
    padding: '10px',
    borderBottom: '1px solid #eff1f3',
  },
};

export default function SideBarItemDropdownItem({
  id, name, color, type, isAssigned, handleAssigning,
}) {
  return (
    <div css={styles.itemWrapper}>
      <SideBarItemDropdownItemCheck isAssigned={isAssigned} />
      <SideBarItemDropdownItemName
        id={id}
        name={name}
        color={color}
        type={type}
        handleAssigning={handleAssigning}
      />
    </div>
  );
}

SideBarItemDropdownItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isAssigned: PropTypes.bool.isRequired,
  handleAssigning: PropTypes.func.isRequired,
};
