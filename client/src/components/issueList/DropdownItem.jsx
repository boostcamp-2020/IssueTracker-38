import React from 'react';
import { PropTypes } from 'prop-types';
import SideBarItemDropdownItemCheck from '../issueDetail/presentational/SideBarItemDropdownItemCheck';
import TextButton from '../issueDetail/presentational/TextButton';

const styles = {
  wrapper: {
    display: 'flex',
    padding: '5px',
    borderBottom: '1px solid #eff1f3',
  },
  filterName: {
    margin: 'auto 0',
  },
};

export default function DropdownItem({
  id, value, isSelected, onClick,
}) {
  return (
    <div css={styles.wrapper}>
      <SideBarItemDropdownItemCheck isAssigned={isSelected} />
      <TextButton onClick={() => onClick(id)} text={value} extraStyle={styles.filterName} />
    </div>
  );
}

DropdownItem.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
