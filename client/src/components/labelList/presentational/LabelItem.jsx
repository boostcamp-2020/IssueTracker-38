import React from 'react';
import { PropTypes } from 'prop-types';
import TextButton from '../../issueDetail/presentational/TextButton';
import LabelItemWrapper from '../layouts/LabelItemWrapper';

const styles = {
  name: {
    padding: '2px 10px',
    backgroundColor: 'violet',
    fontWeight: 'bolder',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
  description: {
    position: 'absolute',
    top: '15px',
    left: '400px',
  },
  buttons: {
    marginLeft: 'auto',
  },
};

export default function LabelItem({
  name, color, description, editState, editEvent, deleteEvent,
}) {
  return (
    <>
      <LabelItemWrapper>
        <div css={{ ...styles.name, backgroundColor: color }}>
          {name}
        </div>
        <div css={styles.description}>
          {description || 'No description' }
        </div>
        <div css={styles.buttons}>
          {editState ? <></> : <TextButton text="Edit" onClick={editEvent} />}
          <TextButton text="Delete" onClick={deleteEvent} />
        </div>
      </LabelItemWrapper>
      {editState ? <div /> : <></>}
    </>
  );
}

LabelItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editState: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};
