import React from 'react';
import { PropTypes } from 'prop-types';
import Comment from './Comment';

export default function CommentList({ issueAuthorId, comments, updateComment }) {
  return (
    <>
      {comments.map(({
        id, content, userId, createdAt, updatedAt,
      }) => (
        <Comment
          id={id}
          content={content}
          userId={userId}
          createdAt={createdAt}
          updatedAt={updatedAt}
          issueAuthorId={issueAuthorId}
          comments={comments}
          updateComment={updateComment}
        />
      ))}
    </>
  );
}

CommentList.propTypes = {
  issueAuthorId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateComment: PropTypes.func.isRequired,
};
