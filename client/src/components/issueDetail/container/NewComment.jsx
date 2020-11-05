import React, { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI, commentAPI } from '../../../apis/api';
import { IssuesContext } from '../../../stores/IssueStore';
import EditComment from './EditComment';
import DefaultButton from '../presentational/DefaultButton';
import SubmitButton from '../presentational/SubmitButton';

export default function NewComment({ user, issue, addComment }) {
  const { dispatch } = useContext(IssuesContext);
  const [newContent, setNewContent] = useState('');

  const createComment = async (e) => {
    e?.preventDefault();
    if (newContent.length === 0) return;
    setNewContent('');

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
      <DefaultButton text={issue?.isClosed ? 'Reopen issue' : 'Close issue'} onClick={changeIssueStatus} />
      <SubmitButton text="Comment" onClick={createComment} isActive={newContent.length !== 0} />
    </EditComment>
  );
}

NewComment.propTypes = {
  user: PropTypes.shape.isRequired,
  issue: PropTypes.shape.isRequired,
  addComment: PropTypes.func.isRequired,
};
