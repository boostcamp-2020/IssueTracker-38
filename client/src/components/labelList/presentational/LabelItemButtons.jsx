import React from 'react';
import { PropTypes } from 'prop-types';
import TextButton from '../../issueDetail/presentational/TextButton';

const styles = {
  buttons: {
    marginLeft: 'auto',
  },
};

export default function LabelItemButtons({
  editState, editEvent, deleteEvent,
}) {
  return (
    <div css={styles.buttons}>
      {editState && <TextButton text="Edit" onClick={editEvent} />}
      <TextButton text="Delete" onClick={deleteEvent} />
    </div>
  );
}

LabelItemButtons.propTypes = {
  editState: PropTypes.bool.isRequired,
  editEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};
