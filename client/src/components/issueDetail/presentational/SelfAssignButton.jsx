import { React } from 'react';
import { PropTypes } from 'prop-types';
import TextButton from './TextButton';

const styles = {
  selfAssignButton: {
    marginLeft: '0',
    fontSize: '12px',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue',
    },
  },
};

export default function SelfAssignButton({ onClick }) {
  return (
    <TextButton
      text="assign yourself"
      extraStyle={styles.selfAssignButton}
      onClick={onClick}
    />
  );
}

SelfAssignButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
