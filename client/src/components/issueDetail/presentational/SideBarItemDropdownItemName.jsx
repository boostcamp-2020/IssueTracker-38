import React from 'react';

import { PropTypes } from 'prop-types';

const styles = {
  item: {
    marginLeft: '10px',
    border: 'none',
    background: 'white',
  },
  colorSample: {
    width: '12px',
    height: '12px',
    marginRight: '5px',
  },
};

export default function SideBarItemDropdownItemName({
  id, name, color, type, handleAssigning,
}) {
  return (
    <button
      onClick={handleAssigning}
      css={{ ...styles.item, display: 'flex' }}
      type="button"
      key={id}
    >
      {type === 'Labels' ? <div css={{ ...styles.colorSample, backgroundColor: color }} /> : <></>}
      <div>{name}</div>
    </button>
  );
}

SideBarItemDropdownItemName.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleAssigning: PropTypes.func.isRequired,
};
