import React from 'react';

import { PropTypes } from 'prop-types';

const styles = {
  item: {
    width: 'max-content',
    padding: '5px',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
};

export default function NewIssueSideBarAssignedDropdown({ assigned }) {
  return (
    <div>
      {assigned.map(({ name, color }) => (
        <div css={{ ...styles.item, background: color }}>
          {name}
        </div>
      ))}
    </div>
  );
}

NewIssueSideBarAssignedDropdown.propTypes = {
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
};
