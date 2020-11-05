import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI, commentAPI } from '../../apis/api';
import { IssuesContext } from '../../stores/IssueStore';
import EditComment from './EditComment';
import commonStyles from './commonStyles';

export default function NewComment({ user, issue, addComment }) {
  const { dispatch } = useContext(IssuesContext);
  const [newContent, setNewContent] = useState('');

  const createComment = async (e) => {
    e?.preventDefault();
    if (newContent.length === 0) return;

    const comment = await commentAPI.create(
      { issueId: issue.id, userId: user.id, content: newContent },
    );

    if (!comment) return;
    addComment(comment);
  };

  const changeIssueStatus = async (e) => {
    e.preventDefault();

    await createComment();
    const result = await issueAPI.update({ id: issue.id, isClosed: !issue.isClosed });

    if (!result) return;
    const updated = { ...issue, isClosed: !issue.isClosed };
    dispatch({ type: 'UPDATE', payload: updated });
  };

  return (
    <EditComment newContent={newContent} setNewContent={setNewContent}>
      <button css={commonStyles.basicButton} type="submit" onClick={changeIssueStatus}>
        {issue?.isClosed ? 'Reopen issue' : 'Close issue'}
      </button>
      <button css={{ ...commonStyles.commentButton, backgroundColor: newContent.length === 0 ? '#94d3a2' : '#2ea44f' }} type="submit" onClick={createComment}>
        Comment
      </button>
    </EditComment>
  );
}

NewComment.propTypes = {
  user: PropTypes.shape.isRequired,
  issue: PropTypes.shape.isRequired,
  addComment: PropTypes.func.isRequired,
};
