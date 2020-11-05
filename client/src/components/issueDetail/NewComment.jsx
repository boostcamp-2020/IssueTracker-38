import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI, commentAPI } from '../../apis/api';
import { IssuesContext } from '../../stores/IssueStore';
import EditComment from './EditComment';
import commonStyles from './commonStyles';

export default function NewComment({ user, issue }) {
  const { dispatch } = useContext(IssuesContext);
  const [newContent, setNewContent] = useState();

  const createComment = async (e) => {
    e?.preventDefault();
    if (!newContent || newContent.length === 0) return;

    const comment = await commentAPI.create({ issueId: issue.id, userId: user.id, newContent });
    // TODO : comment 목록 상태 업데이트 필요함
    // if (res) console.log(res);
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
      <button css={commonStyles.commentButton} type="submit" onClick={createComment}>
        Comment
      </button>
    </EditComment>
  );
}

NewComment.propTypes = {
  user: PropTypes.shape.isRequired,
  issue: PropTypes.shape.isRequired,
};
