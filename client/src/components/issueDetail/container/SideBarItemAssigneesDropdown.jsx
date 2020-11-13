import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../../stores/IssueStore';

import { getItemById } from '../../../utils/utils';

import { issueAPI } from '../../../apis/api';

import SideBarItemDropdownItem from '../presentational/SideBarItemDropdownItem';
import SideBarItemDropdownHeader from '../presentational/SideBarItemDropdownHeader';

import SideBarItemDropdownWrapper from '../layouts/SideBarItemDropdownWrapper';

export default function SideBarItemAssigneesDropdown({
  items, assigned, type, dropdownRef,
}) {
  const { issueId } = useParams();
  const { issues, dispatch } = useContext(IssuesContext);

  const isAlreadyAssigned = (id) => getItemById(assigned, id);

  const targetIssue = { ...getItemById(issues, +issueId) };

  const handleAssigneesAssigning = (id) => async () => {
    const actionType = isAlreadyAssigned(id) ? 'delete' : 'add';
    const { assignees } = targetIssue;
    const actions = {
      add: () => assignees.push(id),
      delete: () => assignees.splice(assignees.indexOf(id), 1),
    };

    actions[actionType]();
    const result = await issueAPI.update({ id: issueId, assignee: { type: actionType, id } });
    if (!result) return;

    // dispatch({ type: 'UPDATE', payload: targetIssue });
  };

  return (
    <SideBarItemDropdownWrapper ref={dropdownRef}>
      <SideBarItemDropdownHeader type={type} />
      {items.map(({ id, itemName, color }) => (
        <SideBarItemDropdownItem
          id={id}
          name={itemName}
          color={color}
          type={type}
          isAssigned={!!isAlreadyAssigned(id)}
          handleAssigning={handleAssigneesAssigning(id)}
        />
      ))}
    </SideBarItemDropdownWrapper>
  );
}

SideBarItemAssigneesDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  dropdownRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]).isRequired,
};
