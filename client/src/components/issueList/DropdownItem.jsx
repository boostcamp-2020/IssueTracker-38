import React from 'react';
import { PropTypes } from 'prop-types';
import SideBarItemDropdownItemCheck from '../issueDetail/presentational/SideBarItemDropdownItemCheck';
import TextButton from '../issueDetail/presentational/TextButton';

export default function DropdownItem({
  id, value, isSelected, onClick,
}) {
  return (
    <>
      <SideBarItemDropdownItemCheck isAssigned={isSelected} />
      <TextButton onClick={() => onClick(id)} key={id} text={value} />
    </>
  );
}

DropdownItem.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
