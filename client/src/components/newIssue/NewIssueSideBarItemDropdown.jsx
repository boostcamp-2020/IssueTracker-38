import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import { UsersContext } from '../../stores/UserStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';

import { getItemById, getNicknameByEmail } from '../../utils/utils';

const styles = {
  layout: {
    position: 'absolute',
    border: '1px solid',
    padding: '10px',
    background: 'white',
  },
  item: {
    border: 'none',
    background: 'white',
  },
};

export default function NewIssueSideBarItemDropdown({
  items, assigned, setAssigned, title,
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

  return (
    <div css={styles.layout}>
      {items.map(({ id, itemName }) => (
        <div>
          {isAlreadyAssigned(id)
            ? <span css={{ color: 'black' }}>v </span>
            : <span css={{ color: 'white' }}>v </span>}
          <button
            onClick={handleAssigning(id)}
            css={styles.item}
            type="button"
            key={id}
          >
            {itemName}
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
};
