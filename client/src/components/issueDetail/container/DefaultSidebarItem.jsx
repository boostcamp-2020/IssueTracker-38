import { React, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../../stores/IssueStore';
import { getItemById } from '../../../utils/utils';
import { issueAPI } from '../../../apis/api';
import TextButton from '../presentational/TextButton';

const styles = {
  defaultMessage: {
    color: '#586069',
    fontWeight: '100',
  },
  selfAssignButton: {
    marginLeft: '0',
    fontSize: '12px',
    '&:hover': {
      color: 'blue',
    },
  },
};

export default function DefaultSidebarItem({
  title, author, defaultMessage,
}) {
  const { issues, dispatch } = useContext(IssuesContext);
  const { issueId } = useParams();
  const assignMyself = (id) => async () => {
    const type = 'add';
    const targetIssue = { ...getItemById(issues, +issueId) };

    const { assignees } = targetIssue;
    assignees.push(id);

    const result = await issueAPI.update({ id: issueId, assignee: { type, id } });
    if (!result) return;

    dispatch({ type: 'UPDATE', payload: targetIssue });
  };
  return (
    <div>
      {title === 'Assignees'
        ? (
          <div css={styles.defaultMessage}>
            {defaultMessage}
            <TextButton
              text="assign yourself"
              extraStyle={styles.selfAssignButton}
              onClick={assignMyself(author.id)}
            />
          </div>
        )
        : <div css={styles.defaultMessage}>{defaultMessage}</div>}

    </div>
  );
}

DefaultSidebarItem.propTypes = {
  defaultMessage: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
};
