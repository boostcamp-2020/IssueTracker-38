import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import { UsersContext } from '../../stores/UserStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';

import { checkMarkIcon } from '../../icons/icons';

import { getItemById, getNicknameByEmail } from '../../utils/utils';

const styles = {
  layout: {
    position: 'absolute',
    width: '300px',
    marginLeft: '-10px',
    border: '1px solid #eff1f3',
    background: 'white',
    boxShadow: '0px 0px 20px 5px #d2d2d2',
  },
  item: {
    border: 'none',
    background: 'white',
  },
  haedMessage: {
    padding: '10px',
    backgroundColor: '#f7f8fa',
    borderBottom: '1px solid #eff1f3',
  },
  itemWrapper: {
    display: 'flex',
    padding: '10px',
    borderBottom: '1px solid #eff1f3',
  },
  colorSample: {
    width: '12px',
    height: '12px',
    marginRight: '5px',
  },
};

export default function NewIssueSideBarItemDropdown({
  items, assigned, setAssigned, title, dropdownRef,
}) {
  const { labels } = useContext(LabelsContext);
  const { users } = useContext(UsersContext);
  const { milestones } = useContext(MilestoneContext);

  if (!labels[0] || !users[0] || !milestones[0]) {
    return <div />;
  }

  const isAlreadyAssigned = (id) => getItemById(assigned, id);

  const handleAssigning = (id) => async () => {
    const type = isAlreadyAssigned(id) ? 'delete' : 'add';

    if (title === 'Assignees') {
      const targetItem = getItemById(users, id);
      const name = getNicknameByEmail(targetItem.email);

      const actions = {
        add: () => setAssigned([...assigned, { id, name }]),
        delete: () => setAssigned(assigned.filter((item) => item.id !== id)),
      };

      actions[type]();
    }

    if (title === 'Labels') {
      const targetItem = getItemById(labels, id);
      const { name, color } = targetItem;

      const actions = {
        add: () => setAssigned([...assigned, { id, name, color }]),
        delete: () => setAssigned(assigned.filter((item) => item.id !== id)),
      };

      actions[type]();
    }

    if (title === 'Milestone') {
      const targetItem = getItemById(milestones, id);
      const name = targetItem.title;

      const actions = {
        add: () => setAssigned([{ id, name }]),
        delete: () => setAssigned([]),
      };

      actions[type]();
    }
  };

  const getHeadMessage = () => {
    if (title === 'Assignees') return 'Assign up to 10 people to this issue';
    if (title === 'Labels') return 'Apply labels to this issue';
    return 'Set milestone';
  };

  return (
    <div css={styles.layout} ref={dropdownRef}>
      <div css={styles.haedMessage}>
        {getHeadMessage()}
      </div>
      {items.map(({ id, itemName, color }) => (
        <div css={styles.itemWrapper}>
          <div css={{ fill: isAlreadyAssigned(id) ? '#24292e' : 'white' }}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path fillRule="evenodd" d={checkMarkIcon} />
            </svg>
          </div>
          <button
            onClick={handleAssigning(id)}
            css={{ ...styles.item, display: 'flex' }}
            type="button"
            key={id}
          >
            {title === 'Labels' ? <div css={{ ...styles.colorSample, backgroundColor: color }} /> : <></>}
            <div>{itemName}</div>
          </button>
        </div>
      ))}
    </div>
  );
}

NewIssueSideBarItemDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAssigned: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dropdownRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]).isRequired,
};
