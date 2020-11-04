import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import SideBarItemTitle from './SideBarItemTitle';
import SideBarItemDropdown from './SideBarItemDropdown';

const styles = {
  layout: {
    width: '300px',
    padding: '10px 0',
    borderBottom: '1px solid #eaecef',
  },
  item: {
    width: 'max-content',
    padding: '2px 10px',
    margin: '5px 5px 0 0',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
  defaultMessage: {
    color: '#586069',
    fontWeight: '100',
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
      {isAction && (
      <SideBarItemDropdown
        items={dropdownItems}
        assigned={assigned}
        title={title}
      />
      )}
      <div>
        {!assigned || assigned.length === 0 || Object.keys(assigned[0]).length === 0
          ? (<div css={styles.defaultMessage}>{defaultMessage}</div>)
          : assigned.map((element) => (
            <div css={{ ...styles.item, background: element.color, display: element.name ? 'inline-block' : 'block' }}>
              {element.name || element.title || element.email }
            </div>
          ))}
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
