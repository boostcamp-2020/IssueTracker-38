import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import { PropTypes } from 'prop-types';

import SideBarItemTitle from '../presentational/SideBarItemTitle';
import SideBarItemDropdown from '../presentational/SideBarItemDropdown';

import DefaultSidebarItem from './DefaultSidebarItem';
import AssignedSidebarItem from './AssignedSidebarItem';

import SideBarItemWrapper from '../layouts/SideBarItemWrapper';

export default function SideBarItem({
  title, defaultMessage, dropdownItems, assigned, author,
}) {
  const [isAction, toggleAction] = useState(false);
  const dropdownRef = useRef(null);
  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  const pageClickEvent = useCallback(({ target }) => {
    const { current } = dropdownRef;
    if (current && !current.contains(target)) toggleAction(!isAction);
  }, [isAction]);

  useEffect(() => {
    if (isAction) window.addEventListener('click', pageClickEvent);
    return () => window.removeEventListener('click', pageClickEvent);
  }, [isAction]);

  return (
    <SideBarItemWrapper>
      <SideBarItemTitle
        title={title}
        onClick={handleAssignButton}
      />
      {isAction && (
        <SideBarItemDropdown
          items={dropdownItems}
          assigned={assigned}
          title={title}
          dropdownRef={dropdownRef}
          type={title}
        />
      )}
      <div>
        {!assigned || assigned.length === 0 || Object.keys(assigned[0]).length === 0
          ? <DefaultSidebarItem author={author} title={title} defaultMessage={defaultMessage} />
          : <AssignedSidebarItem title={title} assigned={assigned} />}
      </div>
    </SideBarItemWrapper>
  );
}

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  author: PropTypes.node.isRequired,
};
