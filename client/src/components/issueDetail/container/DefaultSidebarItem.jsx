import { React } from 'react';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';

import { issueAPI } from '../../../apis/api';
import SelfAssignButton from '../presentational/SelfAssignButton';
import DefaultMessageWrapper from '../layouts/DefaultSidebarItemWrapper';

export default function DefaultSidebarItem({
  title, author, defaultMessage,
}) {
  const { issueId } = useParams();
  const assignMyself = (id) => async () => {
    const type = 'add';
    await issueAPI.update({ id: issueId, assignee: { type, id } });
  };

  return (
    <div>
      {title === 'Assignees'
        ? (
          <DefaultMessageWrapper>
            {defaultMessage}
            <SelfAssignButton onClick={assignMyself(author.id)} />
          </DefaultMessageWrapper>
        )
        : <DefaultMessageWrapper>{defaultMessage}</DefaultMessageWrapper>}

    </div>
  );
}

DefaultSidebarItem.propTypes = {
  defaultMessage: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
};
