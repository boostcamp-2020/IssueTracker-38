import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';
// import { IssuesContext } from '../../../stores/IssueStore';

import { getItemById } from '../../../utils/utils';

import { issueAPI } from '../../../apis/api';

import SideBarItemDropdownItem from '../presentational/SideBarItemDropdownItem';
import SideBarItemDropdownHeader from '../presentational/SideBarItemDropdownHeader';

import SideBarItemDropdownWrapper from '../layouts/SideBarItemDropdownWrapper';

export default function SideBarItemLabelsDropdown({
  items, assigned, type, dropdownRef,
}) {
  const { issueId } = useParams();
  // const { issues, dispatch } = useContext(IssuesContext);

  const isAlreadyAssigned = (id) => getItemById(assigned, id);

  // const targetIssue = { ...getItemById(issues, +issueId) };

  const handleLabelsAssigning = (id) => async () => {
    const actionType = isAlreadyAssigned(id) ? 'delete' : 'add';
    // const { labels } = targetIssue;
    // const actions = {
    //   add: () => labels.push(id),
    //   delete: () => labels.splice(labels.indexOf(id), 1),
    // };

    // actions[actionType]();
    const result = await issueAPI.update({ id: issueId, label: { type: actionType, id } });
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
          handleAssigning={handleLabelsAssigning(id)}
        />
      ))}
    </SideBarItemDropdownWrapper>
  );
}

SideBarItemLabelsDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  dropdownRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]).isRequired,
};
