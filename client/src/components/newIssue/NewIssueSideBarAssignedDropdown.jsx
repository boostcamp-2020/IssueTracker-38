import React from 'react';

import { PropTypes } from 'prop-types';

const styles = {
  item: {
    width: 'max-content',
    padding: '2px 10px',
    margin: '5px 5px 0 0',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
};

export default function NewIssueSideBarAssignedDropdown({ assigned }) {
  return (
    <div>
      {assigned.map(({ name, color }) => (
        <div css={{ ...styles.item, background: color, display: name ? 'inline-block' : 'block' }}>
          {name}
        </div>
      ))}
    </div>
  );
}

NewIssueSideBarAssignedDropdown.propTypes = {
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
};
