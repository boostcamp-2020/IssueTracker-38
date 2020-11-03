import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import SideBarItemTitle from './SideBarItemTitle';
import SideBarItemDropdown from './SideBarItemDropdown';

const styles = {
  layout: {
    width: '300px',
    border: '1px solid',
  },
  item: {
    width: 'max-content',
    padding: '5px',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
};

export default function SideBarItem({
  title, defaultMessage, dropdownItems, assigned,
}) {
  const [isAction, toggleAction] = useState(false);

  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  return (
    <div css={styles.layout}>
      <SideBarItemTitle
        title={title}
        onClick={handleAssignButton}
      />
      {isAction && <SideBarItemDropdown items={dropdownItems} assigned={assigned} />}
      <div>
        {assigned && assigned.length > 0
          ? assigned.map((element) => (
            <div css={{ ...styles.item, background: element.color }}>
              {element.name || element.title || element.email }
            </div>
          ))
          : defaultMessage}
      </div>
    </div>
  );
}

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
};
