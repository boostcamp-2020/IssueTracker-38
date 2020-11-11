import { React } from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  item: {
    width: 'max-content',
    padding: '2px 10px',
    margin: '5px 5px 0 0',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
};

export default function AssignedItems({ assigned }) {
  return (
    <div>
      {assigned.map((element) => (
        <div css={{ ...styles.item, background: element.color, display: element.name ? 'inline-block' : 'block' }}>
          {element.name || element.title || element.nickname}
        </div>
      ))}
    </div>
  );
}

AssignedItems.propTypes = {
  assigned: PropTypes.arrayOf(PropTypes.node).isRequired,
};
