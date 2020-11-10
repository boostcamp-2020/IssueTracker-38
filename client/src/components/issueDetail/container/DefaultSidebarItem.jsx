import { React, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';

import { IssuesContext } from '../../../stores/IssueStore';
import { getItemById } from '../../../utils/utils';
import { issueAPI } from '../../../apis/api';
import SelfAssignButton from '../presentational/SelfAssignButton';
import DefaultMessageLayout from '../layouts/DefaultSidebarItemLayout';

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

    const result = await issueAPI.update({ id: issueId, assignee: { type, id: author.id } });
    if (!result) return;

    dispatch({ type: 'UPDATE', payload: targetIssue });
  };

  return (
    <div>
      {title === 'Assignees'
        ? (
          <DefaultMessageLayout>
            {defaultMessage}
            <SelfAssignButton onClick={assignMyself(author.id)} />
          </DefaultMessageLayout>
        )
        : <DefaultMessageLayout>{defaultMessage}</DefaultMessageLayout>}

    </div>
  );
}

DefaultSidebarItem.propTypes = {
  defaultMessage: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
};
