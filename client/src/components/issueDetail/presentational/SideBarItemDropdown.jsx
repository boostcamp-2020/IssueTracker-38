import React from 'react';

import { PropTypes } from 'prop-types';

import SideBarItemAssigneesDropdown from '../container/SideBarItemAssigneesDropdown';
import SideBarItemLabelsDropdown from '../container/SideBarItemLabelsDropdown';
import SideBarItemMilestoneDropdown from '../container/SideBarItemMilestoneDropdown';

export default function SideBarItemDropdown({
  items, assigned, type, dropdownRef,
}) {
  return (
    <>
      {type === 'Assignees'
      && (
      <SideBarItemAssigneesDropdown
        items={items}
        assigned={assigned}
        type={type}
        dropdownRef={dropdownRef}
      />
      )}
      {type === 'Labels'
      && (
      <SideBarItemLabelsDropdown
        items={items}
        assigned={assigned}
        type={type}
        dropdownRef={dropdownRef}
      />
      )}
      {type === 'Milestone'
      && (
      <SideBarItemMilestoneDropdown
        items={items}
        assigned={assigned}
        type={type}
        dropdownRef={dropdownRef}
      />
      )}
    </>
  );
}

SideBarItemDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  dropdownRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]).isRequired,
};
